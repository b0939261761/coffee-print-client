<template>
  <div
    class='input-range'
    ref='inputRange'
    :style='{"--min": min, "--max": max }'
  >
    <div class='wrapper-label'>
      <label
        class='label'
        :for='id'
        v-text='label'
      ></label>

      <output
        class='output-label'
        v-text='value'
      ></output>
    </div>

    <div class="wrapper-input">
      <input
        :value='value'
        @change='$emit("change", $event.target.value)'
        @input='onInput'
        type='range'
        class='input'
        :id='id'
        :min='min'
        :max='max'
        :step='step'
      />
      <output
        class='output-input'
        v-text='value'
      ></output>
    </div>

  </div>
</template>

<script>

export default {
  name: 'InputRange',
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
      default: 10
    },
    step: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    id: null
  }),
  methods: {
    onInput(event) {
      const value = +event.target.value;
      this.$emit('input', +value);

      this.setValueCss(value);
    },
    setValueCss(value) {
      this.$refs.inputRange.style.setProperty('--value', value);
      this.$refs.inputRange.style.setProperty('--value-width', `${value}`.length);
    }
  },
  mounted() {
    // eslint-disable-next-line
    this.id = this._uid;

    this.setValueCss(this.value);
    this.$refs.inputRange.style.setProperty('--min', this.min);
    this.$refs.inputRange.style.setProperty('--max', this.max);
  }
};
</script>

<style scoped>
.input-range {
  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--value) - var(--min)) / var(--range));

  position: relative;
  padding: .625rem 0;
  line-height: 1rem;
  text-align: left;
}

.wrapper-label {
  display: flex;
  justify-content: space-between;
  padding-bottom: .25rem;
}

.label {
  font-size: .9375rem;
  color: #fff;
}

.output-label {
  font-size: .9375rem;
  color: #fff;
}

.wrapper-input {
  position: relative;
  width: 100%;
  padding: .125rem 0;
  line-height: .75rem;
}

.input {
  width: 100%;
  height: .75rem;
  margin: 0;
  padding: 0;
  font: normal 1rem / 1 sans-serif;
  background: transparent;
  cursor: grab;
  -webkit-appearance: none;
}

input::-webkit-slider-runnable-track {
  --size-x: calc(.75rem * .5 + var(--ratio) * ( 100% - .75rem ));

  box-sizing: border-box;
  width: 100%;
  height: .125rem;
  background-color: #eee;
  background-image: linear-gradient(#34b9eb, #218ab1);
  background-repeat: no-repeat;
  background-size: var(--size-x) 100%;
  border: none;
  border-radius: .0625rem;
  box-shadow:
    0 -.03125rem rgba(0, 0, 0, .3),
    inset 0 .03125rem 0 hsla(0, 0%, 100%, .2),
    0 .03125rem 0 hsla(0, 0%, 100%, .3);
}

.input::-moz-range-track {
  box-sizing: border-box;
  width: 100%;
  height: .125rem;
  background-color: #eee;
  border: none;
  border-radius: .0625rem;
  box-shadow:
    0 -.03125rem rgba(0, 0, 0, .3),
    inset 0 .03125rem 0 hsla(0, 0%, 100%, .2),
    0 .03125rem 0 hsla(0, 0%, 100%, .3);
}

.input::-ms-track {
  box-sizing: border-box;
  width: 100%;
  height: .125rem;
  color: transparent;
  background-color: #eee;
  border: none;
  border-radius: .0625rem;
  box-shadow:
    0 -.03125rem rgba(0, 0, 0, .3),
    inset 0 .03125rem 0 hsla(0, 0%, 100%, .2),
    0 .03125rem 0 hsla(0, 0%, 100%, .3);
}

.input::-webkit-slider-thumb {
  width: .75rem;
  height: .75rem;
  margin-top: calc((.125rem - .75rem) * .5);
  background-color: #34b9eb;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='5' cy='5' r='1' fill='%235D509E'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 50%;
  border: none;
  border-radius: 50%;
  box-shadow: 0 .03125rem 2px rgba(0, 0, 0, .3);
  transition: box-shadow .2s ease;
  -webkit-appearance: none;
  will-change: box-shadow;
}

.input::-moz-range-thumb {
  width: .75rem;
  height: .75rem;
  margin-top: calc((.125rem - .75rem) * .5);
  background-color: #34b9eb;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='5' cy='5' r='1' fill='%235D509E'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 50%;
  border: none;
  border-radius: 50%;
  box-shadow: 0 .03125rem 2px rgba(0, 0, 0, .3);
  transition: box-shadow .2s ease;
  will-change: box-shadow;
}

.input::-ms-thumb {
  width: .75rem;
  height: .75rem;
  margin-top: 0;
  background-color: #34b9eb;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='5' cy='5' r='1' fill='%235D509E'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 50%;
  border: none;
  border-radius: 50%;
  box-shadow: 0 .03125rem 2px rgba(0, 0, 0, .3);
  transition: box-shadow .2s ease;
  will-change: box-shadow;
}

.input::-ms-tooltip {
  display: none;
}

.input::-moz-range-progress {
  height: .125rem;
  background-image: linear-gradient(#34b9eb, #218ab1);
}

.input::-ms-fill-lower {
  height: .125rem;
  background-image: linear-gradient(#34b9eb, #218ab1);
}

/* Убарать обводку при фокусе в Firefox */
.input::-moz-focus-outer {
  border: 0;
}

.input:focus {
  outline: none;
}

.input:focus:not(:active)::-webkit-slider-thumb {
  box-shadow:
    0 .03125rem 2px rgba(0, 0, 0, .3),
    0 0 0 .5rem rgba(255, 255, 255, .2);
}

.input:focus:not(:active)::-moz-range-thumb {
  box-shadow:
    0 .03125rem 2px rgba(0, 0, 0, .3),
    0 0 0 .5rem rgba(255, 255, 255, .2);
}

.input:focus:not(:active)::-ms-track {
  box-shadow:
    0 .03125rem 2px rgba(0, 0, 0, .3),
    0 0 0 .5rem rgba(255, 255, 255, .2);
}

.output-input {
  position: absolute;
  bottom: 0;
  left: calc(var(--ratio) * (100% - .75rem) - (2rem - .75rem) / 2);
  width: 2rem;
  height: 3.875rem;
  padding-top: .5rem;
  font-size: calc(100% - var(--value-width, 3) / 5 * .3rem);
  text-align: center;
  color: white;
  text-shadow: 0 -.03125rem 0 rgba(0, 0, 0, .4);
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='62' fill='none'%3E%3Cpath fill='%2334b9eb' d='M11.7 51.8C12.6 51 15 49 15 46v-3c0-7.2-8-13.4-10.3-15.7c-6.2-6.3-6.2-16.4 0-22.6c3-3 7-4.7 11.3-4.7 c8.8 0 16 7.2 16 16c0 4.2-1.7 8.3-4.7 11.3C25 29.6 17 35.8 17 43v3c0 3 2.5 5 3.2 5.8'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  transform: scale(.2);
  transform-origin: 50% 90%;
  opacity: .0001;
  transition:
    opacity .2s ease,
    transform .2s ease;
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity, left;
}

.input:active + .output-input {
  transform: scale(1);
  opacity: 1;
}

.input:focus + .output-input {
  transform: scale(1);
  opacity: 1;
}

</style>
