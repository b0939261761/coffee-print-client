<template>
<div class='label-value'>
  <span
    v-text = 'label'
    class = 'label-value__label'
  ></span>
  <span
    class = 'label-value__value'
    v-text = 'value'
  ></span>
</div>
</template>

<script>
export default {
  name: 'LabelValue',
  props: {
    label: {
      type: String || null,
      default: ''
    },
    value: {
      type: String || Number || null,
      default: ''
    }
  }
};
</script>

<style scoped>
.label-value {
  display: flex;
  flex-wrap: wrap;
  margin: 0 1.25rem 1.25rem 0;
  font-size: 1.125rem;
  text-align: left;
  color: inherit;
}

.label-value__label {
  margin-right: 1rem;
}

.label-value__value {
  font-weight: bold;
}
</style>
