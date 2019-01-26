<template>
  <div class="edit-picture">
    <div class="wrapper-img">
      <canvas
        class='img-viewer'
        ref='canvas'
    />
    </div>

    <section class='controls'>
      <header class='controls-header'>

        <Btn
          :label='$t("rollUp")'
           @click='controlsMainVisible = !controlsMainVisible'
           size='small'
           colorTheme='dark'
        >
          <span class='rollup-icon'>&nbsp;</span>
        </Btn>
      </header>

      <div :class='["controls-main", { "controls-main--visible": controlsMainVisible } ]'>
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
          :min='-50'
          :max='50'
          :step='0.5'
        />

        <InputRange
          :label='$t("offsetY")'
          v-model='offsetY'
          @change='renderImage'
          :min='-50'
          :max='50'
          :step='0.5'
        />

        <InputRange
          :label='$t("rotate")'
          v-model='rotate'
          @change='renderImage'
          :min='-360'
          :max='360'
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
          :label='$t("balanceColor")'
          v-model='balanceColor'
          @change='renderImage'
          :min='0'
          :max='255'
        />

      </div>

      <footer class='controls-footer'>
        <Btn
          :label='$t("back")'
          @click='onBack'
        />

        <Btn
          :label='$t("sendOnDevice")'
           @click='sendFile'
        />

      </footer>
    </section>
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
    balanceColor: 123,
    controlsMainVisible: true
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
      console.log(`${process.env.VUE_APP_BASE_URL}/file/${result.data.fileName}`);
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

      // Маштабирование
      const scale = this.scale / 50;
      const scaleSize = canvasSize / scale;

      // Смещение изображения
      const offsetX = this.offsetX * this.image.width / 100 * scale;
      const offsetY = this.offsetY * this.image.height / 100 * scale;

      this.context.drawImage(
        this.image,
        offsetX, offsetY, scaleSize, scaleSize,
        -offsetRotate, -offsetRotate, canvasSize, canvasSize
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
.app {
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path d="M1 2V0h1v1H0v1z" fill-opacity=".025"/></svg>');
  background-repeat: repeat;
  background-size: 1.25rem 1.25rem;
}

.edit-picture {
  width: 100%;
  max-width: 64rem;
  height: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .edit-picture {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.controls {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 31.25rem;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  padding: .5rem  .9375rem 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .25rem .25rem 0 0;
}

@media (min-width: 768px) {
  .controls {
    position: static;
    flex-shrink: 3;
    padding-bottom: 1rem;
    border-radius: .25rem 0 0 .25rem;
  }
}

@media (min-width: 64rem) {
  .controls {
    border-radius: .25rem;
  }
}

.controls-header {
  text-align: right;
}

/* Иконка на кнопке */
.rollup-icon {
  position: relative;
  display: inline-block;
  width: 1rem;
  margin-left: .5rem;
  pointer-events: none;
}

.rollup-icon::before {
  content: '';
  position: absolute;
  width: .75rem;
  height: .75rem;
  border: 0 solid #fff;
  border-width: 0 0 3px 3px;
  transform: rotate(-45deg);
}

.controls-main {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height .5s ease-out,
    opacity .7s ease-out;
}

.controls-main--visible {
  max-height: 800px;
  overflow: visible;
  opacity: 1;
}

.controls-footer {
  display: flex;
  justify-content: space-between;
}

.wrapper-img {
  position: relative;
  display: block;
  width: 31.25rem;
  max-width: calc(100% - .625rem);
  margin: .3125rem;
  overflow: hidden;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 5px 3px #333;
}

@media (min-width: 768px) {
  .wrapper-img {
    margin-right: .8rem;
  }
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
