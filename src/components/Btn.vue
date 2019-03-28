<template>
  <button
    v-on = '$listeners'
    :class = '["btn", classSize, classColorTheme ]'
  >
      <slot name = 'icon' class = 'btn__icon'></slot>

    {{ label }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    label: {
      type: String || null,
      default: ''
    },
    size: {
      type: String || null,
      validator: value => ['normal', 'small'].includes(value),
      default: 'normal'
    },
    colorTheme: {
      type: String || null,
      validator: value => ['primary', 'dark', 'outline'].includes(value),
      default: 'primary'
    }
  },
  computed: {
    classSize() {
      return `btn--${this.size}`;
    },
    classColorTheme() {
      return `btn--${this.colorTheme}`;
    }
  }
};
</script>


<style scoped>
.btn {
  position: relative;
  min-width: 8.8rem;
  min-height: 3.6rem;
  margin: 0 0 1.5rem 0;
  padding: .8rem 1.6rem;
  overflow: hidden;
  font-weight: bold;
  font-size: 1.4rem;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  background-color: #2196f3;
  border: none;
  border-radius: .2rem;
  outline: 0;
  box-shadow:
    0 .3rem .1rem -.2rem rgba(0, 0, 0, .2),
    0 .2rem .2rem 0 rgba(0, 0, 0, .14),
    0 .1rem .5rem 0 rgba(0, 0, 0, .12);
  cursor: pointer;
  appearance: button;
  user-select: none;
  will-change: box-shadow;
}

.btn:active {
  box-shadow:
    0 .5rem .5rem -.3rem rgba(0, 0, 0, .2),
    0 .8rem 1rem .1rem rgba(0, 0, 0, .14),
    0 .3rem 1.4rem .2rem rgba(0, 0, 0, .12);
}

.btn::after {
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

.btn:active::after {
  transform: scale(100);
  opacity: .1;
  transition:
    transform .3s ease-out,
    opacity .5s ease-out;
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

.btn:hover::before,
.btn:focus::before {
  opacity: .12;
}

.btn--small {
  min-height: 2.4rem;
  padding: .32rem 1.6rem;
}

.btn--dark {
  background-color: rgba(0, 0, 0, .3);
}

.btn--outline {
  color: rgba(0, 0, 0, .87);
  background-color: #f5f5f5;
}

.btn__icon {
  display: inline-block;
  max-height: 3.6rem;
  fill: white;
}
</style>
