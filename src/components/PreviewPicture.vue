<template>
  <div class='preview-picture'>
    <canvas
      ref = 'canvas'
      class = 'preview-picture__canvas'
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
  watch: {
    '$store.state.file.fileUrl': 'setupImage'
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
    truncatePosition(value, center) {
      let newValue = value;
      if (center > 0) {
        if (value < -center) newValue = -center;
        if (value > center) newValue = center;
      } else {
        if (value > -center) newValue = -center;
        if (value < center) newValue = center;
      }
      return newValue;
    },
    move(x, y) {
      if (!this.isMoving) return;

      const offsetX = this.truncatePosition(this.lastOffsetX + x - this.moveStartPosX,
        this.offsetXCenter);
      const offsetY = this.truncatePosition(this.lastOffsetY + y - this.moveStartPosY,
        this.offsetYCenter);

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
      const image = await loadImage(this.$store.state.file.fileUrl);

      const { width, height } = image;

      const { orientation } = this.$store.state.file;

      const canvasRotate = document.createElement('canvas');
      const context = canvasRotate.getContext('2d');

      if (orientation > 4 && orientation < 9) {
        canvasRotate.width = height;
        canvasRotate.height = width;
      } else {
        canvasRotate.width = width;
        canvasRotate.height = height;
      }

      switch (orientation) {
        case 2: context.transform(-1, 0, 0, 1, width, 0); break;
        case 3: context.transform(-1, 0, 0, -1, width, height); break;
        case 4: context.transform(1, 0, 0, -1, 0, height); break;
        case 5: context.transform(0, 1, 1, 0, 0, 0); break;
        case 6: context.transform(0, 1, -1, 0, height, 0); break;
        case 7: context.transform(0, -1, -1, 0, height, width); break;
        case 8: context.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }

      context.drawImage(image, 0, 0);
      this.canvasRotate = canvasRotate;

      this.renderImage();
    },
    truncateColor(value) {
      if (value < 0) return 0;
      if (value > 255) return 255;
      return Math.round(value);
    },
    renderImage() {
      const {
        canvasRotate, canvas, context, scale, contrast, brightness, zoomMax,
        offsetX, offsetY,
        truncateColor
      } = this;

      const { width: imageWidth, height: imageHeight } = canvasRotate;

      const canvasSize = canvas.clientWidth;
      const centerSize = canvasSize / 2;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      // Clear canvas
      context.clearRect(0, 0, canvasSize, canvasSize);
      context.save();

      const maxSize = +process.env.VUE_APP_MAX_SIZE;
      const minSize = +process.env.VUE_APP_MIN_SIZE;
      const balanceColorRatio = +process.env.VUE_APP_BALANCE_COLOR_RATIO;

      // Матшабирование картинки под оптимальный размер
      let scaleOptimal = 1;
      if (imageWidth > maxSize || imageHeight > maxSize) {
        scaleOptimal = maxSize / (imageWidth > imageHeight ? imageWidth : imageHeight);
      } else if (imageWidth < minSize || imageHeight < minSize) {
        scaleOptimal = minSize / (imageWidth > imageHeight ? imageWidth : imageHeight);
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
        canvasRotate,
        0, 0, imageWidth, imageHeight,
        offsetXMain, offsetYMain, scaledImageWidth, scaledImageHeight
      );

      // Делаем картинку черно-белой
      const imageData = context.getImageData(0, 0, canvasSize, canvasSize);
      const brightnessRatio = brightness / 100;
      const contrastRatio = contrast / 100;
      const contrastIntercept = 127.5 * (1 - contrastRatio);

      for (let i = 0; i < imageData.data.length; i += 4) {
        let red = imageData.data[i];
        let green = imageData.data[i + 1];
        let blue = imageData.data[i + 2];
        const alpha = imageData.data[i + 3];

        // Brightness
        red = truncateColor(red * brightnessRatio);
        green = truncateColor(green * brightnessRatio);
        blue = truncateColor(blue * brightnessRatio);

        // Contrast
        red = truncateColor(red * contrastRatio + contrastIntercept);
        green = truncateColor(green * contrastRatio + contrastIntercept);
        blue = truncateColor(blue * contrastRatio + contrastIntercept);

        const isWhite = ((red + green + blue) / 3) > balanceColorRatio
          || alpha < balanceColorRatio;

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
  width: 50rem;
  max-width: calc(100% - 1rem);
  margin: .5rem;
  overflow: hidden;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 .5rem .3rem #333;
}

@media (min-width: 768px) {
  .preview-picture {
    margin-right: 1.3rem;
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
     https://toster.ru/q/607750 */
  border-radius: inherit;
  cursor: pointer;
}
</style>
