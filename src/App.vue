<template>
  <div class = 'app'>
    <transition name = 'slide'>
      <div
        :key = '$router.currentRoute.name'
        class = 'page'
      >
        <div class = 'page__body'>
          <router-view />
        </div>
      </div>
    </transition>

    <!--
    Отдельный портал для отображения успешной отправки, потому что
    там есть выбор файла который может гененировать ошибку
    -->
    <portal-target name = 'FormModalSendSuccess' />
    <portal-target name = 'formModal' />

    <FormModal
      v-if = 'currentError'
      @cancel = 'onCloseModalError'
    >
      <template slot = 'header'>
        {{ currentError.title }}
      </template>

      <template slot = 'body'>
        {{ currentError.message }}
      </template>

      <template slot = 'footer'>
        <BtnOk @click = 'onCloseModalError' />
      </template>
    </FormModal>
  </div>
</template>


<script>
import FormModal from '@/components/Common/FormModal.vue';
import BtnOk from '@/components/Common/BtnOk.vue';

export default {
  name: 'App',
  components: {
    FormModal,
    BtnOk
  },
  computed: {
    currentError() {
      const error = this.$store.getters['errors/current'];
      if (!error) return null;
      const { code, data } = error;
      const title = this.$t(`errors.${code}.title`);
      const message = this.$t(`errors.${code}.message`, data);
      return { title, message };
    }
  },
  methods: {
    onCloseModalError() {
      this.$store.commit('errors/remove');
    }
  }
};
</script>

<style>

.slide-enter { transform: translateX(100%); }
.slide-enter-to { transform: translateX(0); }
.slide-enter-active { position: absolute; }

.slide-leave { transform: translateX(0); }
.slide-leave-to { transform: translateX(-100%); }

.slide-enter-active,
.slide-leave-active { transition: transform .75s ease-in-out; }

*,
::before,
::after {
  box-sizing: inherit;
}

::selection {
  color: black;
  text-shadow: none;
  background-color: #b3d4fc;
}

/* Стилизация scrollbar */
::-webkit-scrollbar {
  width: .6rem;
}

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(214, 41, 41, .8);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(214, 41, 41, 1);
}

html {
  box-sizing: border-box;
  height: 100%;
  font-size: 10px;
  line-height: 1.5;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica', sans-serif;
  text-align: center;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app {
  display: flex;
  width: 100%;
  height: 100%;
}

.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f7796a;
}

.page__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50rem;
  max-width: calc(100% - 4rem);
  height: calc(100% - 2rem);
  margin: auto auto 0;
  overflow: hidden;
  background-color: rgba(255, 255, 255, .44);
  background-image:
    url('./assets/logo-white.png'),
    url('./assets/background-bottom.png');
  background-repeat: no-repeat;
  background-position:
    center 5rem,
    center bottom;
  background-size:
    17rem auto,
    calc(100% - 2rem) auto;
  border-radius: .5rem .5rem 0 0;
  box-shadow: .2rem -.2rem 1rem 0 rgba(0, 0, 0, .2);
}
</style>
