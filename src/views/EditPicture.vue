<template>
<div class = 'edit-picture'>
  <div class='wrapper-editor'>
    <PreviewPicture
      v-bind = 'settingsPicture'
      @input = 'onSettingInput'
      @setupCanvas = 'canvas = $event'
    />

    <section class = 'controls'>
      <SettingsPicture
        v-bind = 'settingsPicture'
        @input = 'onSettingInput'
      />

      <footer class = 'controls__footer'>
        <Btn
          :label = '$t("back")'
          @click = '$router.push({name: "selectPicture", params: {code: $store.state.device.code}})'
        />
        <BtnSend :canvas = 'canvas' />
      </footer>

    </section>
  </div>
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
      contrast: 0,
      brightness: 0
    },
    canvas: null
  }),
  methods: {
    onSettingInput({ key, value }) {
      this.settingsPicture[key] = +value;
    }
  }
};
</script>

<style scoped>
.edit-picture {
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path d="M1 2V0h1v1H0v1z" fill-opacity=".025"/></svg>');
  background-repeat: repeat;
  background-size: 1.25rem 1.25rem;
}

.wrapper-editor {
  position: relative;
  width: 100%;
  max-width: 64rem;
  height: 100%;
  margin: 0 auto;
  border: .1px solid transparent; /* Что бы маржины не выпирали */
}

@media (min-width: 768px) {
  .wrapper-editor {
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

@media (min-width: 1024px) {
  .controls {
    border-radius: .25rem;
  }
}

.controls__footer {
  display: flex;
  justify-content: space-between;
}
</style>
