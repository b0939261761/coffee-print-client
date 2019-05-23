<template>
  <div class='edit-picture'>
    <div
      ref = 'wrapperCanvas'
      class = 'edit-picture__wrapper-canvas'
    >
      <canvas
        ref = 'canvas'
        :style = 'styleCanvas'
        class = 'edit-picture__canvas'

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

    <footer class = 'edit-picture__footer'>
      <InputRange
        :label = 'scaleTitle'
        :value = 'scale'
        :min = '-3'
        :max = '3'
        :step = '0.1'
        suffix = 'X'
        class = 'edit-picture__range-scale'
        @input = 'scale = $event'
      />

      <div class = 'edit-picture__wrapper-btn'>
        <BtnBack
          class = 'edit-picture__btn-back'
          @click = 'onGoSelectPicture'
        />

        <BtnSend :canvas = 'canvas' />
      </div>
    </footer>
  </div>
</template>

<script>
import { loadImage } from '@/utils/file';
import { addOnResize, removeOnResize, debounceRAF } from '@/utils/events';

import BtnBack from '@/components/Common/BtnBack.vue';
import BtnSend from '@/components/EditPicture/BtnSend.vue';
import InputRange from '@/components/Base/InputRange.vue';

const IMAGE_ZOOM_RANGE = 3;
const IMAGE_MAX_SIZE = 1024;
const IMAGE_MIN_SIZE = 400;

const distance = (x1, x2, y1, y2) => Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));

const truncateColor = value => {
  if (value < 0) return 0;
  if (value > 255) return 255;
  return Math.round(value);
};

const truncatePosition = (value, center) => {
  let newValue = value;
  if (center > 0) {
    if (value < -center) newValue = -center;
    if (value > center) newValue = center;
  } else {
    if (value > -center) newValue = -center;
    if (value < center) newValue = center;
  }
  return newValue;
};

const scaleLog = (zoomScale, zoomMax) => Math.round(
  Math.log(zoomScale) / Math.log(zoomMax) * zoomMax * 10
) / 10;

export default {
  name: 'EditPicture',
  components: {
    InputRange,
    BtnBack,
    BtnSend
  },
  props: {
    autofit: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    scale: 0,
    canvas: null,
    canvasSize: 0
  }),
  computed: {
    scaleTitle() {
      return this.$t('scale');
    },
    styleCanvas() {
      return {
        height: `${this.canvasSize}px`,
        width: `${this.canvasSize}px`
      };
    }
  },
  watch: {
    '$store.state.file.fileUrl': 'setupImage',
    scale: 'renderImage'
  },
  created() {
    this.zoomMin = 1 / IMAGE_ZOOM_RANGE;
    this.zoomMax = IMAGE_ZOOM_RANGE;

    this.$options.zoomRa_ngeMin = -this.zoomMax;
    this.$options.zoomRangeMax = this.zoomMax;

    this.debounceRenderImage = debounceRAF(this.renderImage);

    const onResize = addOnResize(this.setCanvasSize);
    this.$once('hook:destroyed', () => removeOnResize(onResize));
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.setupImage();
  },
  methods: {
    onGoSelectPicture() {
      this.$router.push({ name: 'selectPictureIndex', params: { code: this.$store.state.device.code } });
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

      const offsetX = truncatePosition(this.lastOffsetX + x - this.moveStartPosX,
        this.offsetXCenter);
      const offsetY = truncatePosition(this.lastOffsetY + y - this.moveStartPosY,
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
      this.zoomDistanceStart = distance(x1, y1, x2, y2);
    },
    zoom(x1, y1, x2, y2) {
      if (!this.isZooming) return;

      const zoomDistance = distance(x1, y1, x2, y2);
      let zoomScale = this.lastZoomScale + (zoomDistance - this.zoomDistanceStart) / 100;

      if (zoomScale > this.zoomMax) {
        zoomScale = this.zoomMax;
      } else if (zoomScale < this.zoomMin) {
        zoomScale = this.zoomMin;
      }

      this.scale = scaleLog(zoomScale, this.zoomMax);
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

      this.scale = 0;

      this.lastOffsetX = 0;
      this.lastOffsetY = 0;

      this.offsetX = 0;
      this.offsetY = 0;

      this.setCanvasSize();

      if (this.autofit) {
        this.scale = scaleLog(this.canvasSize / Math.max(height, width), this.zoomMax);
      }

      this.renderImage();
    },
    setCanvasSize() {
      // Что бы canvas не влиял на высоту выкидываем его из контекста
      this.canvas.style.position = 'absolute';

      const {
        width: containerWidth, height: containerHeight
      } = this.$refs.wrapperCanvas.getBoundingClientRect();

      this.canvas.style.position = 'initial';
      this.canvasSize = Math.min(containerWidth, containerHeight) - 10;
    },
    renderImage() {
      const {
        canvasRotate, canvas, context, scale, zoomMax,
        offsetX, offsetY, canvasSize
      } = this;

      const { width: imageWidth, height: imageHeight } = canvasRotate;

      canvas.width = canvasSize;
      canvas.height = canvasSize;

      context.clearRect(0, 0, canvasSize, canvasSize);

      // Матшабирование картинки под оптимальный размер
      let scaleOptimal = 1;
      if (imageWidth > IMAGE_MAX_SIZE || imageHeight > IMAGE_MAX_SIZE) {
        scaleOptimal = IMAGE_MAX_SIZE / (imageWidth > imageHeight ? imageWidth : imageHeight);
      } else if (imageWidth < IMAGE_MIN_SIZE || imageHeight < IMAGE_MIN_SIZE) {
        scaleOptimal = IMAGE_MIN_SIZE / (imageWidth > imageHeight ? imageWidth : imageHeight);
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

      for (let i = 0; i < imageData.data.length; i += 4) {
        let red = imageData.data[i];
        let green = imageData.data[i + 1];
        let blue = imageData.data[i + 2];
        const alpha = imageData.data[i + 3];

        if (!alpha) {
          red = 255;
          green = 255;
          blue = 255;
        }

        // Contrast color = color * contrast / 100 + 127.5 * (1 - contrast / 100)
        red = truncateColor(red * 1.2 - 22.5);
        green = truncateColor(green * 1.2 - 22.5);
        blue = truncateColor(blue * 1.2 - 22.5);

        // GrayScale
        const luma = truncateColor(red * 0.2126 + green * 0.7152 + blue * 0.0722);

        imageData.data[i] = luma;
        imageData.data[i + 1] = luma;
        imageData.data[i + 2] = luma;

        if (alpha !== 255) imageData.data[i + 3] = 255;
      }

      context.putImageData(imageData, 0, 0);
    }
  }
};
</script>

<style scoped>
.edit-picture {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.edit-picture__wrapper-canvas {
  display: flex;
  flex-grow: 1;
  margin: auto 0;
}

.edit-picture__canvas {
  margin: auto;
  border-radius: 50%;
  box-shadow: 0 0 .5rem .3rem #777;
  cursor: pointer;
}

@media (hover: none) {
  .edit-picture__range-scale {
    display: none;
  }
}

.edit-picture__footer {
  margin: 0 .5rem;
  padding: 1rem 1rem 0;
  background-color: rgba(255, 255, 255, .44);
  border-radius: .5rem .5rem 0 0;
  box-shadow: .2rem -.2rem 1rem 0 rgba(0, 0, 0, .2);
}

.edit-picture__wrapper-btn {
  display: flex;
}

.edit-picture__btn-back {
  flex-shrink: 1.5;
  margin-right: 1rem;
}
</style>
