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
            class = 'btn-back'
            @click = 'onGoSelectPicture'
          >
            <template #icon>
              <svg
                xmlns = 'http://www.w3.org/2000/svg'
                viewBox = '0 0 576 512'
              >
                <path
                  d = 'M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9
                    0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4
                    24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4
                    34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7
                    24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z'
                />
              </svg>
            </template>
          </Btn>

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
      brightness: 100,
      contrast: 50
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f7796a;
}

.wrapper-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 102.4rem;
  height: 100%;
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
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50rem;
  max-width: calc(100% - 2rem);
  padding: 1rem 1rem 0;
  background-color: rgba(255, 255, 255, .44);
  border-radius: .5rem .5rem 0 0;
  box-shadow: .2rem -.2rem 1rem 0 rgba(0, 0, 0, .2);
}

@media (min-width: 768px) {
  .controls {
    flex-shrink: 1.5;
    margin-right: .5rem;
  }
}

.controls__footer {
  display: flex;
  width: 100%;
}

.btn-back {
  flex-shrink: 1.5;
  margin-right: 1rem;
}
</style>
