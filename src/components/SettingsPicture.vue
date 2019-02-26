<template>
<div class = 'settings-picture'>
  <InputRange
    :label = '$t("scale")'
    :value = 'scale'
    @input = 'onInput("scale", $event)'
    :min = '-3'
    :max = '3'
    :step = '0.1'
    suffix = 'X'
    class = 'input-range-scale'
  />

  <InputRange
    :label = '$t("contrast")'
    :value = 'contrast'
    @input = 'onInput("contrast", $event)'
    :min = '-20'
    :max = '20'
    :step = '0.5'
    suffix = 'X'
  />

  <InputRange
    :label = '$t("brightness")'
    :value = 'brightness'
    @input = 'onInput("brightness", $event)'
    :min = '-10'
    :max = '10'
    :step = '0.5'
    suffix = 'X'
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
  created() {
    this.$options.zoomRangeMin = -process.env.VUE_APP_ZOOM_RANGE;
    this.$options.zoomRangeMax = +process.env.VUE_APP_ZOOM_RANGE;
  },
  methods: {
    onInput(key, $event) {
      this.$emit('input', { key, value: $event });
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
