<template>
  <button
    v-on=$listeners
    class='btn'
    v-text='label'
  />
</template>

<script>
export default {
  name: 'Btn',
  props: {
    label: {
      type: String || null,
      default: ''
    }
  }
};
</script>


<style scoped>

.btn {
  position: relative;
  min-width: 5.5rem;
  min-height: 2.25rem;
  margin: 0 0 .9375rem 0;
  padding: .5rem 1rem;
  overflow: hidden;
  font-weight: bold;
  font-size: .875rem;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  background-color: #2196f3;
  border: none;
  border-radius: .125rem;
  outline: 0;
  box-shadow:
    0 .1875rem .0625rem -.125rem rgba(0, 0, 0, .2),
    0 .125rem .125rem 0 rgba(0, 0, 0, .14),
    0 .0625rem .3125rem 0 rgba(0, 0, 0, .12);
  cursor: pointer;
  appearance: button;
  user-select: none;
  will-change: box-shadow;
}

.btn:active {
  box-shadow:
    0 .3125rem .3125rem -.1875rem rgba(0, 0, 0, .2),
    0 .5rem 10px .0625rem rgba(0, 0, 0, .14),
    0 .1875rem .875rem .125rem rgba(0, 0, 0, .12);
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
</style>
