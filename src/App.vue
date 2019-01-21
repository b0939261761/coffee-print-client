<template>
  <div class='app'>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'App'
};
</script>

<style>

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
  font-size: 16px;
  line-height: 1.5;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
  margin: 0;
  background-image: url('assets/background.jpg');
  background-repeat: no-repeat;
  background-position: top left;
  background-size: cover;
  background-attachment: fixed;
}

.app {
  width: 100%;
  padding: 0 15px;
}
</style>
