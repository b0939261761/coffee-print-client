<template>
<div :class = '["settings-picture", { "settings-picture--visible": isVisible }]'>
  <InputRange
    :label = '$t("scale")'
    :value = 'scale'
    @input = 'onInput("scale", $event)'
    :min = '-5'
    :max = '5'
    :step = '0.1'
    suffix = 'X'
  />

  <!-- <InputRange
    :label = '$t("offsetX")'
    :value = 'offsetX'
    @input = 'onInput("offsetX", $event)'
    :min = '-50'
    :max = '50'
    :step = '0.5'
    suffix = '%'
  />

  <InputRange
    :label = '$t("offsetY")'
    :value = 'offsetY'
    @input = 'onInput("offsetY", $event)'
    :min = '-50'
    :max = '50'
    :step = '0.5'
    suffix = '%'
  /> -->

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
    isVisible: {
      type: Boolean,
      default: true
    },
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
    contrast: {
      type: Number,
      required: true
    },
    brightness: {
      type: Number,
      required: true
    }
  },
  methods: {
    onInput(key, $event) {
      this.$emit('input', { key, value: $event });
    }
  }
};
</script>

<style scoped>
.settings-picture {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height .5s ease-out,
    opacity .7s ease-out;
}

.settings-picture--visible {
  max-height: 500px;
  opacity: 1;
}
</style>
