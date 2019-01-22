<template>
  <div class='input-range'>
    <label
      class='label'
      for='input'
      v-text='label'
    />
    <input
      :value='value'
      @change='onChange'
      type='range'
      class='input'
      id='input'
      :min='min'
      :max='max'
    />


  </div>
</template>

<script>
export default {
  name: 'InputRange',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    onChange(event) {
      const value = +event.target.value;
      this.$emit('change', value);
    }
  }
};
</script>

<style scoped>


</style>
