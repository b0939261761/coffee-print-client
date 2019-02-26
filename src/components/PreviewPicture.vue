<template>
<div class = 'preview-picture'>
  <canvas
    class = 'preview-picture__canvas'
    ref = 'canvas'
    @mouseup.stop.prevent = 'onMouseup'
    @mousemove.stop.prevent = 'onMousemove'
    @mousedown.stop.prevent = 'onMousedown'
    @mouseout.stop.prevent = 'onMouseout'

    @touchstart.stop.prevent = 'onTouchstart'
    @touchmove.stop.prevent = 'onTouchmove'
    @touchend.stop.prevent = 'onTouchend'
    @touchcancel.stop.prevent = 'onTouchcancel'
  />
</div>
</template>

<script>
import { loadImage } from '@/utils/file';
import { addOnResize, removeOnResize, debounceRAF } from '@/utils/events';

const MAX_SIZE = 1024;
const MIN_SIZE = 400;
const BALANCE_COLOR_RATIO = 122.5;

export default {
  name: 'PreviewPicture',
  props: {
    scale: {
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
    }
  },
  created() {
    this.zoomMin = 1 / +process.env.VUE_APP_ZOOM_RANGE;
    this.zoomMax = +process.env.VUE_APP_ZOOM_RANGE;

    this.lastOffsetX = 0;
    this.lastOffsetY = 0;

    this.offsetX = 0;
    this.offsetY = 0;

    this.debounceRenderImage = debounceRAF(this.renderImage);

    this.$watch(
      vm => Object.values(vm.$props).join(),
      () => this.renderImage()
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
    distance(x1, x2, y1, y2) {
      return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));
    },
    moveStart(x, y) {
      this.isMoving = true;
      this.moveStartPosX = x;
      this.moveStartPosY = y;
    },
    moveStop() {
      if (this.isMoving) {
        this.isMoving = false;
        this.lastOffsetX = this.offsetX;
        this.lastOffsetY = this.offsetY;
      }
    },
    move(x, y) {
      if (!this.isMoving) return;

      let offsetX = this.lastOffsetX + x - this.moveStartPosX;
      let offsetY = this.lastOffsetY + y - this.moveStartPosY;

      const { offsetXCenter, offsetYCenter } = this;

      if (this.offsetXCenter > 0) {
        if (offsetX < -offsetXCenter) offsetX = -offsetXCenter;
        if (offsetX > offsetXCenter) offsetX = offsetXCenter;
      } else {
        if (offsetX > -offsetXCenter) offsetX = -offsetXCenter;
        if (offsetX < offsetXCenter) offsetX = offsetXCenter;
      }

      if (offsetYCenter > 0) {
        if (offsetY < -offsetYCenter) offsetY = -offsetYCenter;
        if (offsetY > offsetYCenter) offsetY = offsetYCenter;
      } else {
        if (offsetY > -offsetYCenter) offsetY = -offsetYCenter;
        if (offsetY < offsetYCenter) offsetY = offsetYCenter;
      }

      if (this.offsetX !== offsetX || this.offsetY !== offsetY) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;

        this.debounceRenderImage();
      }
    },
    zoomStart(x1, y1, x2, y2) {
      this.isZooming = true;
      this.lastZoomScale = this.zoomMax ** (this.scale / this.zoomMax);
      this.zoomDistanceStart = this.distance(x1, y1, x2, y2);
    },
    zoom(x1, y1, x2, y2) {
      if (!this.isZooming) return;

      const zoomDistance = this.distance(x1, y1, x2, y2);
      let zoomScale = this.lastZoomScale + (zoomDistance - this.zoomDistanceStart) / 100;

      if (zoomScale > this.zoomMax) {
        zoomScale = this.zoomMax;
      } else if (zoomScale < this.zoomMin) {
        zoomScale = this.zoomMin;
      }

      const scale = Math.log(zoomScale) / Math.log(this.zoomMax) * this.zoomMax;
      const scaleRound = Math.round(scale * 10) / 10;
      this.$emit('input', { key: 'scale', value: scaleRound });
    },
    zoomStop() {
      if (this.isZooming) {
        this.isZooming = false;
        this.lastZoomScale = this.zoomMax ** (this.scale / this.zoomMax);
      }
    },
    onMousedown(event) {
      this.moveStart(event.clientX, event.clientY);
    },
    onMousemove(event) {
      this.move(event.clientX, event.clientY);
    },
    onMouseup() {
      this.moveStop();
    },
    onMouseout() {
      this.moveStop();
    },
    onTouchstart(event) {
      const touchesLength = event.targetTouches.length;
      if (touchesLength === 1) {
        const { 0: { clientX: x, clientY: y } } = event.targetTouches;
        this.moveStart(x, y);
      } else if (touchesLength === 2) {
        const {
          0: { clientX: x1, clientY: y1 },
          1: { clientX: x2, clientY: y2 }
        } = event.targetTouches;

        this.zoomStart(x1, y1, x2, y2);
      }
    },
    onTouchmove(event) {
      const touchesLength = event.targetTouches.length;

      if (touchesLength >= 1) {
        const { 0: { clientX: x, clientY: y } } = event.targetTouches;
        this.move(x, y);
      }

      if (touchesLength >= 2) {
        const {
          0: { clientX: x1, clientY: y1 },
          1: { clientX: x2, clientY: y2 }
        } = event.targetTouches;

        this.zoom(x1, y1, x2, y2);
      }
    },
    onTouchend(event) {
      const touchesLength = event.targetTouches.length;

      if (!touchesLength || event.targetTouches[0].identifier !== 0) this.moveStop();

      this.zoomStop();
    },
    onTouchcancel() {
      this.moveStop();
      this.zoomStop();
    },
    async setupImage() {
      this.image = await loadImage(this.$store.state.file.fileUrl);
      this.renderImage();
    },
    renderImage() {
      const {
        image, canvas, context, scale, contrast, brightness, zoomMax,
        offsetX, offsetY
      } = this;

      const { width: imageWidth, height: imageHeight } = image;

      const canvasSize = canvas.clientWidth;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      // Clear canvas
      context.clearRect(0, 0, canvasSize, canvasSize);
      context.save();

      // Фильтры - яркость и контрасность
      let filter = '';
      filter += ` contrast(${20 ** (contrast / 20)})`;
      filter += ` brightness(${10 ** (brightness / 10)})`;
      context.filter = filter;

      // Матшабирование картинки под оптимальный размер
      let scaleOptimal = 1;
      if (imageWidth > MAX_SIZE || imageHeight > MAX_SIZE) {
        scaleOptimal = MAX_SIZE / (imageWidth > imageHeight ? imageWidth : imageHeight);
      } else if (imageWidth < MIN_SIZE || imageHeight < MIN_SIZE) {
        scaleOptimal = MIN_SIZE / (imageWidth > imageHeight ? imageWidth : imageHeight);
      }

      // Маштабирование
      const ratio = (zoomMax ** (scale / zoomMax)) * scaleOptimal;

      const scaledImageWidth = imageWidth * ratio;
      const scaledImageHeight = imageHeight * ratio;

      this.offsetXCenter = (canvasSize - scaledImageWidth) / 2;
      this.offsetYCenter = (canvasSize - scaledImageHeight) / 2;

      // Смещение изображения
      const offsetXMain = this.offsetXCenter + offsetX;
      const offsetYMain = this.offsetYCenter + offsetY;

      context.drawImage(
        image,
        0, 0, imageWidth, imageHeight,
        offsetXMain, offsetYMain, scaledImageWidth, scaledImageHeight
      );

      // Делаем картинку черно-белой
      const imageData = context.getImageData(0, 0, canvasSize, canvasSize);

      for (let i = 0; i < imageData.data.length; i += 4) {
        const red = imageData.data[i];
        const green = imageData.data[i + 1];
        const blue = imageData.data[i + 2];
        const alpha = imageData.data[i + 3];

        const isWhite = ((red + green + blue) / 3) > BALANCE_COLOR_RATIO
          || alpha < BALANCE_COLOR_RATIO;

        const color = isWhite ? 255 : 0;

        imageData.data[i] = color;
        imageData.data[i + 1] = color;
        imageData.data[i + 2] = color;

        if (alpha !== 255) imageData.data[i + 3] = 255;
      }

      context.putImageData(imageData, 0, 0);

      const centerSize = canvasSize / 2;

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

.wrapper-btn-back {
  position: absolute;
  top: 0;
  left: 0;
}

.preview-picture__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* Глюк, почему-то на канвасе mousemove срабатывает и на скрытых частях
     https://toster.ru/q/607750
  */
  border-radius: inherit;
  cursor: pointer;
}
</style>
