<template>
  <transition
    appear
    name = 'form-modal'
  >
    <div
      ref = 'formModal'
      class = 'wrapper-form-modal'
      tabindex = '-1'
    >
      <div class = 'form-modal'>
        <header class = 'modal-header'>
          <button
            class = 'modal-btn-close'
            :aria-label = 'cancelTitle'
            @click = 'onCancel'
          >
            &times;
          </button>

          <slot name = 'header' />
        </header>

        <div class = 'modal-body'>
          <slot name = 'body' />
        </div>

        <footer class = 'modal-footer'>
          <slot name = 'footer' />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'FormModal',
  computed: {
    cancelTitle() {
      return this.$t('cancel');
    }
  },
  mounted() {
    // Если задавать через событие на элементе @keydown
    // и открыто 2 модальных окна - то закрываются оба
    const escapeHandler = ({ key }) => {
      if (key === 'Escape') this.$emit('cancel');
    };

    this.$refs.formModal.focus();
    this.$refs.formModal.addEventListener('keydown', escapeHandler);
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    }
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
  overflow: hidden;
  background-color: rgb(33, 33, 33, .46);
}

.form-modal {
  position: relative;
  width: 50rem;
  max-width: calc(100% - 4rem);
  margin: 1.6rem;
  overflow-y: auto;
  text-align: left;
  background-color: white;
  border-radius: .2rem;
  box-shadow:
    0 1.1rem 1.5rem -.7rem rgba(0, 0, 0, .2),
    0 2.4rem 3.8rem .3rem rgba(0, 0, 0, .14),
    0 .9rem 4.6rem .8rem rgba(0, 0, 0, .12);
}

.modal-header {
  margin: 0;
  padding: 1.6rem;
  font-weight: normal;
  font-size: 2.4rem;
  text-align: left;
}

.modal-btn-close {
  position: relative;
  float: right;
  margin: -1.6rem -1.6rem 0 0;
  padding: 1.4rem;
  font-weight: bold;
  font-size: 2.4rem;
  line-height: 1;
  color: rgba(0, 0, 0, .5);
  text-shadow: 0 .1rem 0 #fff;
  background-color: transparent;
  border: 0;
  border-radius: .2rem;
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
  padding: 1.6rem;
  font-size: 1.6rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1.6rem;
}
</style>
