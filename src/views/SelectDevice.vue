<template>
  <div class='select-device'>
    <div
      class='select-device__body'
    >
      <form
        class='select-device__form'
        @submit.prevent='onSubmit'
      >
        <InputText
          v-model = 'deviceCode'
          class = 'select-device__device-code'
          type = 'text'
          placeholder = 'XXXXX'
          :label='coffeePrinterTitle'
          inputmode = 'numeric'
        />

        <Btn
          class = 'select-device__btn-next'
          :label='nextTitle'
          :disabled='!deviceCode'
        >
          <template #icon>
            <svg
              xmlns = 'http://www.w3.org/2000/svg'
              viewBox = '0 0 448 512'
            >
              <path
                d = 'M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441
                     239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6
                     9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4
                     296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9
                     101.2c-9.8-9.3-10-24.8-.4-34.3z'
              />
            </svg>
          </template>
        </Btn>

        <Btn
          v-if = '$store.state.device.code'
          :label = 'backTitle'
          @click = 'onGoSelectPicture'
        >
          <template #icon>
            <svg
              xmlns = 'http://www.w3.org/2000/svg'
              viewBox = '0 0 448 512'
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
      </form>
    </div>
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
    coffeePrinterTitle() {
      return this.$t('coffeePrinter');
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
  background-image:
    url('../assets/logo-white.png'),
    url('../assets/background-bottom.png');
  background-repeat: no-repeat;
  background-position:
    center 2rem,
    center bottom;
  background-size:
    70% auto,
    calc(100% - 2rem) auto;
  border-radius: .5rem .5rem 0 0;
  box-shadow: .2rem -.2rem 1rem 0 rgba(0, 0, 0, .2);
}

@media (min-width: 400px) {
  .select-device__body {
    background-size:
      25.4rem auto,
      calc(100% - 2rem) auto;
  }
}

.select-device__form {
  max-width: 20rem;
}
</style>
