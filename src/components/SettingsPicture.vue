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
    }
  },
  computed: {
    scaleTitle() {
      return this.$t('scale');
    }
  },
  created() {
    this.$options.zoomRangeMin = -process.env.VUE_APP_ZOOM_RANGE;
    this.$options.zoomRangeMax = +process.env.VUE_APP_ZOOM_RANGE;
  },
  methods: {
    onInputScale(event) {
      this.$emit('scale', event);
    }
  }
};
</script>

<style scoped>
.settings-picture {
  width: 100%;
}

@media (hover: none) {
  .input-range-scale {
    display: none;
  }
}
</style>
