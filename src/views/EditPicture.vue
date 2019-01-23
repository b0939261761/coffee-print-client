<template>
  <div class="edit-picture">
    <div class='settings'>

      <InputRange
        :label='$t("scale")'
        v-model='scale'
        @change='renderImage'
        :min='1'
        :max='100'
      />

      <InputRange
        :label='$t("offsetX")'
        v-model='offsetX'
        @change='renderImage'
        :min='-100'
        :max='100'
      />

      <InputRange
        :label='$t("offsetY")'
        v-model='offsetY'
        @change='renderImage'
        :min='-100'
        :max='100'
      />

      <InputRange
        :label='$t("contrast")'
        v-model='contrast'
        @change='renderImage'
        :min='0'
        :max='200'
      />

      <InputRange
        :label='$t("brightness")'
        v-model='brightness'
        @change='renderImage'
        :min='0'
        :max='200'
      />

      <InputRange
        :label='$t("rotate")'
        v-model='rotate'
        @change='renderImage'
        :min='-360'
        :max='360'
      />

      <InputRange
        :label='$t("balanceColor")'
        v-model='balanceColor'
        @change='renderImage'
        :min='0'
        :max='255'
        :step='0.5'
      />

      <Btn :label='$t("sendOnDevice")'
            @click='sendFile' />

      <Btn
        :label='$t("back")'
        @click='onBack'
      />

      <div v-if='fileNameOnServer'>
        <a :href='fileNameOnServer'
            v-text='fileNameOnServer'
        ></a>

      </div>

    </div>
    <div class="wrapper-img">
      <canvas
        class='img-viewer'
        ref='canvas'
      />
    </div>
  </div>
</template>

<script>
import InputRange from '@/components/InputRange.vue';
import Btn from '@/components/Btn.vue';
import { mapState } from 'vuex';
import http from '@/utils/http';
import { loadImage, b64ToUint8Array } from '@/utils/file';
import { addOnResize, removeOnResize } from '@/utils/events';

export default {
  name: 'EditPicture',
  components: {
    Btn,
    InputRange
  },
  data: () => ({
    scale: 50,
    offsetX: 0,
    offsetY: 0,
    contrast: 100,
    brightness: 100,
    rotate: 0,
    balanceColor: 122.5,
    fileNameOnServer: null
  }),
  computed: mapState('file', {
    fileUrl: state => state.fileUrl
  }),
  methods: {
    async sendFile() {
      const b64Image = this.canvas.toDataURL('image/jpeg');
      const u8Image = b64ToUint8Array(b64Image);

      const formData = new FormData();
      formData.append('file', new Blob([u8Image], { type: 'image/jpg' }));
      formData.append('shopCode', 1);
      // formData.append('shopCode', this.$store.state.shop.id);
      formData.append('description', 'Описание файла');

      const result = await http.post('/upload', formData);
      this.fileNameOnServer = `${process.env.VUE_APP_BASE_URL}/file/${result.data.fileName}`;
    },
    renderImage() {
      const canvasSize = this.canvas.clientWidth;
      const centerSize = canvasSize / 2;
      this.canvas.width = canvasSize;
      this.canvas.height = canvasSize;

      // Clear canvas
      this.context.clearRect(0, 0, canvasSize, canvasSize);
      this.context.save();

      // Фильтры - яркость и контрасность
      let filter = '';
      filter += ` contrast(${this.contrast / 100})`;
      filter += ` brightness(${this.brightness / 100})`;
      this.context.filter = filter;

      // Вращение изображения
      let offsetRotate = 0;
      if (this.rotate) {
        offsetRotate = centerSize;
        this.context.translate(offsetRotate, offsetRotate);
        this.context.rotate(this.rotate * Math.PI / 180);
      }

      // Смещение изображения
      const offsetX = this.offsetX + -offsetRotate;
      const offsetY = this.offsetY + -offsetRotate;

      // Маштабирование
      const scale = this.scale / 50;
      const scaleSize = canvasSize / scale;

      this.context.drawImage(
        this.image,
        0, 0, scaleSize, scaleSize,
        offsetX, offsetY, canvasSize, canvasSize
      );

      // Делаем картинку черно-белой
      const imageData = this.context.getImageData(0, 0, canvasSize, canvasSize);

      for (let i = 0; i < imageData.data.length; i += 4) {
        const red = imageData.data[i];
        const green = imageData.data[i + 1];
        const blue = imageData.data[i + 2];
        const alpha = imageData.data[i + 3];

        const isWhite = ((red + green + blue) / 3) > this.balanceColor || alpha < this.balanceColor;

        const color = isWhite ? 255 : 0;

        imageData.data[i] = color;
        imageData.data[i + 1] = color;
        imageData.data[i + 2] = color;

        if (alpha !== 255) imageData.data[i + 3] = 255;
      }

      this.context.putImageData(imageData, 0, 0);

      // Берем картинку в кружочек и белый фон позади кружочка
      this.context.restore();
      this.context.globalCompositeOperation = 'destination-in';
      this.context.arc(centerSize, centerSize, centerSize, 0, 2 * Math.PI);
      this.context.fill();

      this.context.globalCompositeOperation = 'destination-over';
      this.context.rect(0, 0, canvasSize, canvasSize);
      this.context.fillStyle = 'white';
      this.context.fill();
    },
    onBack() {
      console.log(1);
      this.$router.push({ name: 'selectPicture', params: { code: this.$store.state.shop.code } });
    }
  },
  created() {
    const onResize = addOnResize(this.renderImage);
    this.$once('hook:destroyed', () => removeOnResize(onResize));
  },
  async mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.image = await loadImage(this.fileUrl);
    // this.image = await loadImage('http://localhost:4000/111.jpg');
    this.renderImage();
  }
};
</script>

<style scoped>

.edit-picture {
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, .8);
}

.settings {
  background-color: rgba(0, 0, 0, .2);
}

.wrapper-img {
  position: relative;
  display: block;
  width: 500px;
  max-width: 100%;
  background-color: white;
}

.wrapper-img::before {
  content: '';
  display: block;
  width: 100%;
  padding-top: 100%;
}

.img-viewer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
