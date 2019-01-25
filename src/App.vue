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
  height: 100%;
  font-size: 16px;
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
}

.app {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
