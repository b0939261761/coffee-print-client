<template>
  <div
    ref = 'inputRange'
    class = 'input-range'
  >
    <button
      class = 'btn btn--minus'
      :disabled = 'value <= min'
      @click = 'onClickMinus'
    >
      <span class = 'btn__wrapper-icon'>
        <svg
          xmlns = 'http://www.w3.org/2000/svg'
          viewBox='0 0 448 512'
        >
          <path
            d = 'M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33
                 32 32 32h384c17.67 0 32-14.33
                 32-32v-32c0-17.67-14.33-32-32-32z'
          />
        </svg>
      </span>
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
      class = 'btn btn--plus'
      :disabled = 'value >= max'
      @click = 'onClickPlus'
    >
      <span class = 'btn__wrapper-icon'>
        <svg
          xmlns = 'http://www.w3.org/2000/svg'
          viewBox='0 0 448 512'
        >
          <path
            d = 'M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67
                 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0
                 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32
                 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33
                 32-32v-32c0-17.67-14.33-32-32-32z'
          />
        </svg>
      </span>
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
  padding: 1rem 0;
  line-height: 1.6rem;
  text-align: left;
}

.wrapper-main {
  flex-grow: 1;
}

.wrapper-label {
  display: flex;
  justify-content: space-between;
  padding: .4rem;
}

.label {
  font-size: 1.5rem;
  color: #fff;
}

.output-label {
  font-size: 1.5rem;
  color: #fff;
}

.wrapper-input {
  position: relative;
  display: flex;
  width: 100%;
  padding: .2rem 0;
  line-height: 1.2rem;
}

.input {
  flex-grow: 1;
  height: 1.2rem;
  margin: 0;
  padding: 0;
  font: normal 1.6rem / 1 sans-serif;
  background: transparent;
  cursor: grab;
  -webkit-appearance: none;
}

input::-webkit-slider-runnable-track {
  --size-x: calc(1.2rem * .5 + var(--ratio) * (100% - 1.2rem));

  box-sizing: border-box;
  width: 100%;
  height: .2rem;
  background-color: #eee;
  background-image: linear-gradient(#f7796a, #f7796a);
  background-repeat: no-repeat;
  background-size: var(--size-x) 100%;
  border: none;
  border-radius: .1rem;
}

.input::-moz-range-track {
  box-sizing: border-box;
  width: 100%;
  height: .2rem;
  background-color: #eee;
  border: none;
  border-radius: .1rem;
}

.input::-ms-track {
  box-sizing: border-box;
  width: 100%;
  height: .2rem;
  color: transparent;
  background-color: #eee;
  border: none;
  border-radius: .1rem;
}

.input::-webkit-slider-thumb {
  width: 1.2rem;
  height: 1.2rem;
  margin-top: calc((.2rem - 1.2rem) * .5);
  background-color: #f7796a;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 50%;
  border: none;
  border-radius: 50%;
  transition: box-shadow .2s ease;
  -webkit-appearance: none;
  will-change: box-shadow;
}

.input::-moz-range-thumb {
  width: 1.2rem;
  height: 1.2rem;
  margin-top: calc((.2rem - 1.2rem) * .5);
  background-color: #f7796a;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 50%;
  border: none;
  border-radius: 50%;
  box-shadow: 0 .5rem .2rem rgba(0, 0, 0, .3);
  transition: box-shadow .2s ease;
  will-change: box-shadow;
}

.input::-ms-thumb {
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0;
  background-color: #f7796a;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 50%;
  border: none;
  border-radius: 50%;
  box-shadow: 0 .5rem .2rem rgba(0, 0, 0, .3);
  transition: box-shadow .2s ease;
  will-change: box-shadow;
}

.input::-ms-tooltip {
  display: none;
}

.input::-moz-range-progress {
  height: .2rem;
  background-image: linear-gradient(#34b9eb, #218ab1);
}

.input::-ms-fill-lower {
  height: .2rem;
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
    0 .5rem .2rem rgba(0, 0, 0, .3),
    0 0 0 .8rem rgba(255, 255, 255, .2);
}

.input:focus:not(:active)::-moz-range-thumb {
  box-shadow:
    0 .5rem .2rem rgba(0, 0, 0, .3),
    0 0 0 .8rem rgba(255, 255, 255, .2);
}

.input:focus:not(:active)::-ms-track {
  box-shadow:
    0 .5rem .2rem rgba(0, 0, 0, .3),
    0 0 0 .8rem rgba(255, 255, 255, .2);
}

.output-input {
  position: absolute;
  bottom: 0;
  left: calc(var(--ratio) * (100% - 1.2rem) - (3.2rem - 1.2rem) / 2);
  width: 3.2rem;
  height: 6.2rem;
  padding-top: .8rem;
  font-size: calc(1.6rem - var(--value-width, 3) / 5 * .48rem);
  text-align: center;
  color: white;
  text-shadow: 0 -.05rem 0 rgba(0, 0, 0, .4);
  background-image:
    url(
      'data:image/svg+xml;charset=utf-8,%3Csvg xmlns = "http://www.w3.org/2000/svg" width = "32" height = "62" fill = "none" %3E%3Cpath fill="%23f7796a" d = "M11.7 51.8C12.6 51 15 49 15 46v-3c0-7.2-8-13.4-10.3-15.7c-6.2-6.3-6.2-16.4 0-22.6c3-3 7-4.7 11.3-4.7 c8.8 0 16 7.2 16 16c0 4.2-1.7 8.3-4.7 11.3C25 29.6 17 35.8 17 43v3c0 3 2.5 5 3.2 5.8"/%3E%3C/svg%3E'
    );
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

.btn {
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  overflow: hidden;
  font-size: 1.6rem;
  background-color: #f7796a;
  border: none;
  border-radius: 50%;
  outline: 0;
  box-shadow:
    0 .3rem .1rem -.2rem rgba(0, 0, 0, .2),
    0 .2rem .2rem 0 rgba(0, 0, 0, .14),
    0 .1rem .5rem 0 rgba(0, 0, 0, .12);
  cursor: pointer;
  appearance: button;
  user-select: none;
  will-change: box-shadow;
  fill: white;
}

.btn:active {
  box-shadow:
    0 .5rem .5rem -.3rem rgba(0, 0, 0, .2),
    0 .8rem 1rem .1rem rgba(0, 0, 0, .14),
    0 .3rem 1.4rem .2rem rgba(0, 0, 0, .12);
}

.btn:disabled {
  color: rgba(0, 0, 0, .26);
  background-color: rgba(0, 0, 0, .12);
  fill: rgba(0, 0, 0, .26);
}

.btn::before {
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

.btn:hover:enabled::before,
.btn:focus:enabled::before {
  opacity: .12;
}

.btn__wrapper-icon {
  display: block;
  height: 1.8rem;
  pointer-events: none;
}

.btn__wrapper-icon svg {
  height: 100%;
}

.btn--plus {
  margin-left: 1.6rem;
}

.btn--minus {
  margin-right: 1.6rem;
}

</style>
