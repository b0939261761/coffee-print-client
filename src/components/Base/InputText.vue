<template>
  <div class='input-text'>
    <input
      id = 'input'
      :value = 'value'
      :type = 'type'
      :placeholder = 'placeholder'
      :inputmode = 'inputmode'
      class = 'input'
      @input = 'onInput'
    >
    <label
      class = 'label'
      for = 'input'
      v-text = 'label'
    />
  </div>
</template>

<script>
export default {
  name: 'InputText',
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
    },
    inputmode: {
      type: String,
      default: null
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    }
  }
};
</script>

<style scoped>
.input-text {
  position: relative;
  margin: 0 auto;
  padding-top: 1.5rem;
  text-align: left;
}

.input,
.label {
  width: 100%;
  padding: .6rem 1.2rem;
  font-size: 1.6rem;
}

.label {
  position: absolute;
  top: 1.5rem;
  left: 0;
  width: 125%;
  overflow: hidden;
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
  transform: translateY(-2.3rem) scale(.8);
  transform-origin: 0 0;
  transition:
    transform .3s cubic-bezier(.25, .8, .5, 1),
    width .3s cubic-bezier(.25, .8, .5, 1),
    color .3s cubic-bezier(.25, .8, .5, 1);
  will-change: transform;
}

.input {
  display: block;
  height: calc(3.6rem + .2rem);
  margin: 0 0 1.5rem 0;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: .1rem solid #ced4da;
  border-radius: .4rem;
  transition:
    border-color .15s ease-in-out,
    box-shadow .15s ease-in-out;
}

.input:not(:hover):not(:focus):placeholder-shown + .label {
  width: 100%;
  color: #a5a5a5;
  transform: translateY(0) scale(1);
  pointer-events: none;
}

.input.placeholder-shown:not(:hover):not(:focus) + .label {
  width: 100%;
  color: #a5a5a5;
  transform: translateY(0) scale(1);
  pointer-events: none;
}

.input::placeholder {
  color: transparent;
  transition: color .3s cubic-bezier(.25, .8, .5, 1);
}

.input:focus::placeholder,
.input:hover::placeholder {
  color: #a5a5a5;
}

.input:focus {
  color: #495057;
  background-color: white;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 .32rem rgba(0, 123, 255, .25);
}
</style>
