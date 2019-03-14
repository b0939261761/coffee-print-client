<template>
  <div
    ref = 'inputRange'
    class = 'input-range'
  >
    <button
      class = 'button button--minus'
      :disabled = 'value <= min'
      @click = 'onClickMinus'
    >
      <svg
        class = 'icon'
        viewBox = '0 0 78 21'
        xmlns = 'http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        height = '30px'
        width = '30px'
        fill = '#ffffff'
      >
        <rect
          width='78'
          height='21'
          rx='5.7'
          ry='5.7'
        />
      </svg>
    </button>

    <div class = 'wrapper-main'>
      <div class = 'wrapper-label'>
        <label
          class = 'label'
          :for = 'id'
          v-text = 'label'
        />

        <output
          class = 'output-label'
          v-text = 'valueFormat'
        />
      </div>

      <div class = 'wrapper-input'>
        <input
          :id='id'
          ref='input'
          :value='value'
          type='range'
          class='input'
          :min='min'
          :max='max'
          :step='step'
          @change='onRangeChange'
          @input='onInput'
        >
        <output
          class='output-input'
          v-text='value'
        />
      </div>
    </div>
    <button
      class = 'button button--plus'
      :disabled = 'value >= max'
      @click = 'onClickPlus'
    >
      <svg
        class='icon icon--plus'
        viewBox='0 0 78 78'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M72.3 28.5H49.5V5.7A5.7 5.7 0 0 0 43.8 0h-9.6a5.7
              5.7 0 0 0-5.7 5.7v22.8H5.7A5.7 5.7 0 0 0 0 34.2v9.6a5.7
              5.7 0 0 0 5.7 5.7h22.8v22.8a5.7 5.7 0 0 0 5.7 5.7h9.6a5.7
              5.7 0 0 0 5.7-5.7V49.5h22.8a5.7 5.7 0 0 0 5.7-5.7v-9.6a5.7 5.7 0 0 0-5.7-5.7z'
        />
      </svg>
    </button>
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
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    id: null
  }),
  computed: {
    valueFormat() {
      return `${this.value}${this.suffix}`;
    }
  },
  watch: {
    value(value) {
      this.setValueCss(value);
    }
  },
  mounted() {
    // eslint-disable-next-line
    this.id = this._uid;

    // Через инлайновые стили идет видимая заддержка
    this.$refs.inputRange.style.setProperty('--min', this.min);
    this.$refs.inputRange.style.setProperty('--max', this.max);
    this.setValueCss(this.value);
  },
  methods: {
    onInput(event) {
      const value = +event.target.value;
      this.$emit('input', +value);
    },
    setValueCss(value) {
      this.$refs.inputRange.style.setProperty('--value', value);
      this.$refs.inputRange.style.setProperty('--value-width', `${value}`.length);
    },
    onClickButton(operator) {
      this.$refs.input.click();
      this.$refs.input.focus();
      const step = this.step * (operator === '-' ? -10 : 10);
      const value = (this.value * 10 + step) / 10;
      this.$emit('input', value);
    },
    onClickMinus() {
      this.onClickButton('-');
    },
    onClickPlus() {
      this.onClickButton('+');
    },
    onRangeChange(event) {
      this.$emit('change', event.target.value);
    }
  }
};
</script>

<style scoped>
.input-range {
  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--value) - var(--min)) / var(--range));

  position: relative;
  display: flex;
  padding: .625rem 0;
  line-height: 1rem;
  text-align: left;
}

.wrapper-main {
  flex-grow: 1;
}

.wrapper-label {
  display: flex;
  justify-content: space-between;
  padding: .25rem;
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
  display: flex;
  width: 100%;
  padding: .125rem 0;
  line-height: .75rem;
}

.input {
  flex-grow: 1;
  height: 12px;
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

.button {
  position: relative;
  flex-shrink: 0;
  align-self: center;
  width: 24px;
  height: 24px;
  padding: 1px 6px;
  overflow: hidden;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  background-color: rgba(52, 185, 235, .8);
  border: none;
  border-radius: 50%;
  outline: 0;
  box-shadow:
    0 .1875rem .3125rem -.0625rem rgba(255, 255, 255, .2),
    0 .375rem .625rem 0 rgba(255, 255, 255, .14),
    0 .0625rem 1.125rem 0 rgba(255, 255, 255, .12);
  cursor: pointer;
  appearance: button;
  user-select: none;
  will-change: box-shadow;
}

.button:active {
  box-shadow:
    0 .4375rem .5rem -.25rem rgba(255, 255, 255, .2),
    0 .75rem 1.0625rem .125rem rgba(255, 255, 255, .14),
    0 .3125rem 1.375rem .25rem rgba(255, 255, 255, .12);
}

.button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(255, 255, 255, .5) 1%, transparent 1.01%);
  transform: scale(0);
  opacity: 1;
  pointer-events: none;
  will-change: transform, opacity;
}

.button:active::after {
  transform: scale(100);
  opacity: .1;
  transition:
    transform .1s ease-out,
    opacity .2s ease-out;
}

.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: currentColor;
  border-radius: inherit;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.25, .8, .5, 1);
  pointer-events: none;
  will-change: opacity;
}

.button:hover::before,
.button:focus::before {
  opacity: .12;
}

.button:focus:not(:active) {
  box-shadow: 0 0 .125rem .1875rem rgba(255, 255, 255, .3);
}

.button--plus {
  margin-left: 1rem;
}

.button--minus {
  margin-right: 1rem;
}

.icon {
  display: block;
  width: 100%;
  height: 100%;
  fill: white;
}
</style>
