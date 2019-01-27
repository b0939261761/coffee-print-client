<template>
<div class = 'preview-picture'>
  <canvas
    class = 'preview-picture__canvas'
    ref = 'canvas'
  />
</div>
</template>

<script>
import { loadImage } from '@/utils/file';
import { addOnResize, removeOnResize, debounce } from '@/utils/events';

export default {
  name: 'PreviewPicture',
  props: {
    scale: {
      type: Number,
      required: true
    },
    offsetX: {
      type: Number,
      required: true
    },
    offsetY: {
      type: Number,
      required: true
    },
    rotate: {
      type: Number,
      required: true
    },
    contrast: {
      type: Number,
      required: true
    },
    brightness: {
      type: Number,
      required: true
    },
    balanceColor: {
      type: Number,
      required: true
    }
  },
  created() {
    const debounceRenderImage = debounce(this.renderImage, 500);

    this.$watch(
      vm => [vm.scale, vm.offsetX, vm.offsetY, vm.rotate,
        vm.contrast, vm.brightness, vm.balanceColor].join(),
      () => debounceRenderImage()
    );

    const onResize = addOnResize(this.renderImage);
    this.$once('hook:destroyed', () => removeOnResize(onResize));
  },
  async mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');
    await this.setupImage();
    this.$emit('setupCanvas', this.canvas);
  },
  watch: {
    '$store.state.file.fileUrl': 'setupImage'
  },
  methods: {
    async setupImage() {
      this.image = await loadImage(this.$store.state.file.fileUrl);
      // this.image = await loadImage('http://localhost:4000/111.jpg');
      this.renderImage();
    },
    renderImage() {
      const {
        image, canvas, context,
        scale, offsetX, offsetY, rotate,
        contrast, brightness, balanceColor
      } = this;

      const canvasSize = canvas.clientWidth;
      const centerSize = canvasSize / 2;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      // Clear canvas
      context.clearRect(0, 0, canvasSize, canvasSize);
      context.save();

      // Фильтры - яркость и контрасность
      let filter = '';
      filter += ` contrast(${contrast})`;
      filter += ` brightness(${brightness})`;
      context.filter = filter;

      // Вращение изображения
      let offsetRotate = 0;
      if (rotate) {
        offsetRotate = centerSize;
        context.translate(offsetRotate, offsetRotate);
        context.rotate(rotate * Math.PI / 180);
      }

      // Маштабирование
      const scaleKoef = (10 + scale) / 10;
      const scaleSize = canvasSize / scaleKoef;

      // Смещение изображения
      const offsetXMain = offsetX * image.width / 100 * scaleKoef;
      const offsetYMain = offsetY * image.height / 100 * scaleKoef;

      context.drawImage(
        image,
        offsetXMain, offsetYMain, scaleSize, scaleSize,
        -offsetRotate, -offsetRotate, canvasSize, canvasSize
      );

      // Делаем картинку черно-белой
      const imageData = context.getImageData(0, 0, canvasSize, canvasSize);

      const balanceColorKoef = 122.5 + balanceColor * 1.225;
      for (let i = 0; i < imageData.data.length; i += 4) {
        const red = imageData.data[i];
        const green = imageData.data[i + 1];
        const blue = imageData.data[i + 2];
        const alpha = imageData.data[i + 3];

        const isWhite = ((red + green + blue) / 3) > balanceColorKoef || alpha < balanceColorKoef;

        const color = isWhite ? 255 : 0;

        imageData.data[i] = color;
        imageData.data[i + 1] = color;
        imageData.data[i + 2] = color;

        if (alpha !== 255) imageData.data[i + 3] = 255;
      }

      context.putImageData(imageData, 0, 0);

      // Берем картинку в кружочек и белый фон позади кружочка
      context.restore();
      context.globalCompositeOperation = 'destination-in';
      context.arc(centerSize, centerSize, centerSize, 0, 2 * Math.PI);
      context.fill();

      context.globalCompositeOperation = 'destination-over';
      context.rect(0, 0, canvasSize, canvasSize);
      context.fillStyle = 'white';
      context.fill();
    }
  }
};
</script>

<style scoped>
.preview-picture {
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
  .preview-picture {
    margin-right: .8rem;
  }
}

.preview-picture::before {
  content: '';
  display: block;
  width: 100%;
  padding-top: 100%;
}

.preview-picture__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
