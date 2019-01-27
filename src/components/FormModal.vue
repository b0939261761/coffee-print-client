<template>
<transition name = 'form-modal'>
  <div
    class = 'wrapper-form-modal'
    ref = 'formModal'
    tabindex = '-1'
    >
    <div class = 'form-modal'>
      <header class = 'modal-header'>
        <button
          class = 'modal-btn-close'
          :aria-label = '$t("cancel")'
          @click = '$emit("cancel")'
        >&times;</button>

        <slot name = 'header'></slot>
      </header>

      <div class = 'modal-body'>
        <slot name = 'body'></slot>
      </div>

      <footer class = 'modal-footer'>
        <slot name = 'footer'></slot>
      </footer>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'ModalForm',
  mounted() {
    // Если задавать через событие на элементе @keydown
    // и открыто 2 модальных окна - то закрываются оба
    const escapeHandler = ({ key }) => {
      if (key === 'Escape') this.$emit('cancel');
    };

    this.$refs.formModal.focus();
    this.$refs.formModal.addEventListener('keydown', escapeHandler);
  }
};
</script>


<style scoped>
/* transition */
.form-modal-enter-to,
.form-modal-leave {
  transform: translateY(0);
}

.form-modal-enter,
.form-modal-leave-to {
  transform: translateY(100%);
}

.form-modal-enter-active {
  position: absolute;
}

.form-modal-enter-active,
.form-modal-leave-active {
  transition: transform .75s ease-in-out;
}

/* ********************* */
.wrapper-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: .5rem;
  overflow: hidden;
  background-color: rgb(33, 33, 33, .46);
}

.form-modal {
  position: relative;
  width: 100%;
  max-width: 31.25rem;
  margin: 1rem;
  overflow-y: auto;
  text-align: left;
  background-color: white;
  border-radius: .125rem;
  box-shadow:
    0 .6875rem .9375rem -.4375rem rgba(0, 0, 0, .2),
    0 1.5rem 2.375rem .1875rem rgba(0, 0, 0, .14),
    0 .5625rem 2.875rem .5rem rgba(0, 0, 0, .12);
}

.modal-header {
  margin: 0;
  padding: 1rem;
  font-weight: normal;
  font-size: 1.5rem;
  text-align: left;
}

.modal-btn-close {
  position: relative;
  float: right;
  margin: -1rem -1rem 0 0;
  padding: .875rem;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1;
  color: rgba(0, 0, 0, .5);
  text-shadow: 0 .0625rem 0 #fff;
  background-color: transparent;
  border: 0;
  border-radius: .125rem;
  outline: none;
  cursor: pointer;
}

.modal-btn-close::before {
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

.modal-btn-close:hover::before,
.modal-btn-close:focus::before {
  opacity: .12;
}

.modal-body {
  padding: 1rem;
  font-size: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}
</style>
