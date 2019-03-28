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
            :label = 'backTitle'
            @click = 'onGoSelectPicture'
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
      contrast: 100,
      brightness: 100
    },
    canvas: null
  }),
  computed: {
    backTitle() {
      return this.$t('back');
    }
  },
  methods: {
    onGoSelectPicture() {
      this.$router.push({ name: 'selectPicture', params: { code: this.$store.state.device.code } });
    },
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
  background-size: 2rem 2rem;
}

.wrapper-editor {
  position: relative;
  width: 100%;
  max-width: 102.4rem;
  height: 100%;
  margin: 0 auto;
  border: .01rem solid transparent; /* Что бы маржины не выпирали */
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
  width: 50rem;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  padding: .8rem  1.5rem 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .4rem .4rem 0 0;
}

@media (min-width: 768px) {
  .controls {
    position: static;
    flex-shrink: 3;
    padding-bottom: 1.6rem;
    border-radius: .4rem 0 0 .4rem;
  }
}

@media (min-width: 1024px) {
  .controls {
    border-radius: .4rem;
  }
}

.controls__footer {
  display: flex;
  justify-content: space-between;
}
</style>
