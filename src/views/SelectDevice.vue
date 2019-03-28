<template>
  <div class='select-device'>
    <form
      class='select-device__body'
      @submit.prevent='onSubmit'
    >
      <InputText
        v-model = 'deviceCode'
        class = 'select-device__device-code'
        type = 'text'
        placeholder = 'XXXXX'
        :label='deviceCodeTitle'
        inputmode = 'numeric'
      />

      <Btn
        :disabled='!deviceCode'
        :label='nextTitle'
      />
    </form>

    <footer
      v-if = '$store.state.device.code'
      class='select-device__footer'
    >
      <Btn
        :label = 'backTitle'
        @click = 'onGoSelectPicture'
      />
    </footer>
  </div>
</template>

<script>
import InputText from '@/components/InputText.vue';
import Btn from '@/components/Btn.vue';

export default {
  name: 'SelectDevice',
  components: {
    InputText,
    Btn
  },
  data: () => ({
    deviceCode: ''
  }),
  computed: {
    deviceCodeTitle() {
      return this.$t('deviceCode');
    },
    nextTitle() {
      return this.$t('next');
    },
    backTitle() {
      return this.$t('back');
    }
  },
  methods: {
    onGoSelectPicture() {
      this.$router.push({ name: 'selectPicture', params: { code: this.$store.state.device.code } });
    },
    onSubmit() {
      if (!this.deviceCode) return;
      this.$store.dispatch('device/getdevice', { code: this.deviceCode });
      this.$router.push({ name: 'selectPicture', params: { code: this.deviceCode } });
    }
  }
};
</script>

<style scoped>
.select-device {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f7796a;
}

.select-device__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50rem;
  max-width: calc(100% - 4rem);
  height: calc(100% - 2rem);
  margin: auto auto 0;
  padding: 4.7rem 2rem 3.2rem;
  background-color: rgba(255, 255, 255, .44);
  background-image: url('../assets/background-bottom.png');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: calc(100% - 2rem) auto;
}
/*
.select-device__body::before {
  content: '';
  position: absolute;
  top: .5rem;
  right: .5rem;
  bottom: .5rem;
  left: .5rem;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .4rem;
} */

.select-device__device-code {
  width: 25rem;
}

.select-device__footer {
  padding-top: 1.5rem;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .4rem .4rem 0 0;
}
</style>
