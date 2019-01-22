<template>
  <div class="editor-picture">
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

      <Btn :label='$t("sendInDevice")'
            @click='sendFile' />

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
import { loadImage } from '@/utils/file';

export default {
  name: 'EditorPicture',
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
    fileNameOnServer: null
  }),
  computed: mapState('file', {
    fileUrl: state => state.fileUrl
  }),
  methods: {
    async sendFile() {
      function b64ToUint8Array(b64Image) {
        const img = atob(b64Image.split(',')[1]);
        const img_buffer = [];
        let i = 0;
        while (i < img.length) {
          img_buffer.push(img.charCodeAt(i));
          i++;
        }
        return new Uint8Array(img_buffer);
      }

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
      const scale = this.scale / 50;

      this.canvas.width = 500;
      this.canvas.height = 500;

      // Clear canvas
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.filter = `contrast(${this.contrast / 100}) brightness(${this.brightness / 100})`;

      this.context.drawImage(
        this.image,
        0, 0, this.canvas.width / scale, this.canvas.height / scale,
        this.offsetX, this.offsetY, this.canvas.width, this.canvas.height
      );
    }
  },
  async mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.image = await loadImage(this.fileUrl);
    this.renderImage();
  }
};
</script>

<style scoped>

.editor-picture {
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
  max-width: 500px;
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
  border: 1px solid black;
}

</style>
