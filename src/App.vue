<template>
<div class = 'app'>
  <transition name = 'slide' >
    <router-view></router-view>
  </transition>

  <!--
    Отдельный портал для отображения успешной отправки, потому что
    там есть выбор файла который может гененировать ошибку
  -->
  <portal-target name = 'FormModalSendSuccess'></portal-target>
  <portal-target name = 'formModal'></portal-target>
</div>
</template>


<script>
export default {
  name: 'App',
  data: () => ({
    preloader: false
  })
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
</style>
