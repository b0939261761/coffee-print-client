<template>
  <div class='input-text'>
    <input
      :value='value'
      @input='$emit("input", $event.target.value)'
      :type='type'
      :placeholder='placeholder'
      class='input'
      id='input'
    >
    <label
      class='label'
      for='input'
    >{{ label }}</label>

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
.input-text {
  position: relative;
  margin: 0 auto;
  padding-top: .9375rem;
  text-align: left;
}

/*
.input {
  display: block;
  width: 100%;
  font-size: 1rem;
  border: none;
  padding: 10px 0;
  border-bottom: solid 1px  #1abc9c;
  transition: all 0.3s cubic-bezier( .64, .09, .08, 1);
  background: linear-gradient(to bottom, rgba(255,255,255,0) 96%,  #1abc9c 4%);
  background-position: -200px 0;
  background-size: 200px 100%;
  background-repeat: no-repeat;
  color:  #1abc9c

}


.input:focus {
    box-shadow: none;
    outline: none;
    background-position: 0 0;

  }


.input:focus::-webkit-input-placeholder {
      color: #1abc9c;
      font-size: 11px;
      transform: translateY(-20px);
      visibility: visible;
    } */


.input,
.label {
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
}

.label {
  position: absolute;
  top: .9375rem;
  left: 0;
  width: 125%;
  overflow: hidden;
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
  transform: translateY(-1.4rem) scale(.8);
  transform-origin: 0 0;
  transition:
    transform .3s cubic-bezier(.25, .8, .5, 1),
    width .3s cubic-bezier(.25, .8, .5, 1),
    color .3s cubic-bezier(.25, .8, .5, 1);
  will-change: transform;
}

.input {
  display: block;
  height: calc(2.25rem + 2px);
  margin: 0 0 .9375rem 0;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
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
  box-shadow: 0 0 0 .2rem rgba(0, 123, 255, .25);
}
</style>
