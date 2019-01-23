<template>
  <div class='input-text'>
    <label
      class='label'
      for='input'
      v-text='label'
    ></label>
    <input
      :value='value'
      @change='$emit("change", $event.target.value)'
      type='checkbox'
      class='input'
      id='input'
    />

  </div>
</template>

<script>
export default {
  name: 'InputCheckbox',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String || null,
      default: null
    },
    label: {
      type: String || null,
      default: ''
    },
    mask: {
      type: Array || null,
      default: null
    }
  },
  methods: {
    // onKeypress(event) {
    // const { target, key } = event;

    // const targetLength = target.value.length;
    // const maskLength = this.mask.length;

    // if (targetLength > maskLength - 1) {
    //   event.preventDefault();
    //   return false;
    // }

    // const newValue = '';
    // const i = targetLength - 1;
    // }
  }
};
</script>

<style scoped>
</style>
