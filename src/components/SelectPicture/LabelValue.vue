<template>
  <div class='label-value'>
    <span
      class = 'label-value__label'
      v-text = 'label'
    />
    <span
      class = 'label-value__value'
      v-text = 'value'
    />
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
  justify-content: center;
  align-items: center;
  margin: 0 0 2rem 0;
  font-size: 1.8rem;
  text-align: left;
  color: #f7796a;
  background-color: rgba(255, 255, 255, .7);
  border-radius: .2rem;
  user-select: none;
}

.label-value__label {
  margin-right: 1.6rem;
}

.label-value__value {
  font-weight: bold;
  font-size: 2.2rem;
}
</style>
