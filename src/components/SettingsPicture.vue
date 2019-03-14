<template>
  <div class = 'settings-picture'>
    <InputRange
      :label = 'scaleTitle'
      :value = 'scale'
      :min = '-3'
      :max = '3'
      :step = '0.1'
      suffix = 'X'
      class = 'input-range-scale'
      @input = 'onInputScale'
    />

    <InputRange
      :label = 'brightnessTitle'
      :value = 'brightness'
      :min = '0'
      :max = '500'
      :step = '10'
      suffix = 'X'
      @input = 'onInputBrightness'
    />

    <InputRange
      :label = 'contrastTitle'
      :value = 'contrast'
      :min = '0'
      :max = '100'
      :step = '1'
      suffix = 'X'
      @input = 'onInputContrast'
    />
  </div>
</template>

<script>
import InputRange from '@/components/InputRange.vue';

export default {
  name: 'SettingsPicture',
  components: {
    InputRange
  },
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
  computed: {
    scaleTitle() {
      return this.$t('scale');
    },
    contrastTitle() {
      return this.$t('contrast');
    },
    brightnessTitle() {
      return this.$t('contrast');
    }
  },
  created() {
    this.$options.zoomRangeMin = -process.env.VUE_APP_ZOOM_RANGE;
    this.$options.zoomRangeMax = +process.env.VUE_APP_ZOOM_RANGE;
  },
  methods: {
    onInput(key, event) {
      this.$emit('input', { key, value: event });
    },
    onInputScale(event) {
      this.onInput('scale', event);
    },
    onInputContrast(event) {
      this.onInput('contrast', event);
    },
    onInputBrightness(event) {
      this.onInput('brightness', event);
    }
  }
};
</script>

<style scoped>
@media (hover: none) {
  .input-range-scale {
    display: none;
  }
}
</style>
