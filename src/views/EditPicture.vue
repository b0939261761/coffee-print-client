<template>
  <div class = 'edit-picture'>
    <PreviewPicture
      v-bind = 'settingsPicture'
      @setupCanvas = 'canvas = $event'
    />

    <section class='controls'>
      <header class='controls-header'>
        <Btn
          :label='$t("rollUp")'
           @click='settingsPictureVisible = !settingsPictureVisible'
           size='small'
           colorTheme='dark'
        >
          <span class='rollup-icon'>&nbsp;</span>
        </Btn>
      </header>

      <SettingsPicture
        v-bind = 'settingsPicture'
        :isVisible = 'settingsPictureVisible'
        @input = 'onSettingInput'
      />

      <footer class='controls-footer'>
        <Btn :label='$t("back")' @click='onBack' />
        <BtnSend :canvas='canvas' />
      </footer>

    </section>
  </div>
</template>

<script>
import PreviewPicture from '@/components/PreviewPicture.vue';
import SettingsPicture from '@/components/SettingsPicture.vue';
import Btn from '@/components/Btn.vue';

import BtnSend from '@/components/BtnSend.vue';

export default {
  name: 'EditPicture',
  components: {
    Btn,
    BtnSend,
    SettingsPicture,
    PreviewPicture
  },
  data: () => ({
    settingsPicture: {
      scale: 0,
      offsetX: 0,
      offsetY: 0,
      contrast: 1,
      brightness: 1,
      rotate: 0,
      balanceColor: 0
    },
    canvas: null,
    settingsPictureVisible: true
  }),
  methods: {
    onSettingInput({ key, value }) {
      this.settingsPicture[key] = +value;
    },
    onBack() {
      this.$router.push({ name: 'selectPicture', params: { code: this.$store.state.shop.code } });
    }
  }
};
</script>

<style scoped>
.app {
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path d="M1 2V0h1v1H0v1z" fill-opacity=".025"/></svg>');
  background-repeat: repeat;
  background-size: 1.25rem 1.25rem;
}

.edit-picture {
  width: 100%;
  max-width: 64rem;
  height: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .edit-picture {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.controls {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 31.25rem;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  padding: .5rem  .9375rem 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .25rem .25rem 0 0;
}

@media (min-width: 768px) {
  .controls {
    position: static;
    flex-shrink: 3;
    padding-bottom: 1rem;
    border-radius: .25rem 0 0 .25rem;
  }
}

@media (min-width: 64rem) {
  .controls {
    border-radius: .25rem;
  }
}

.controls-header {
  text-align: right;
}

/* Иконка на кнопке */
.rollup-icon {
  position: relative;
  display: inline-block;
  width: 1rem;
  margin-left: .5rem;
  pointer-events: none;
}

.rollup-icon::before {
  content: '';
  position: absolute;
  width: .75rem;
  height: .75rem;
  border: 0 solid #fff;
  border-width: 0 0 3px 3px;
  transform: rotate(-45deg);
}

.controls-footer {
  display: flex;
  justify-content: space-between;
}
</style>
