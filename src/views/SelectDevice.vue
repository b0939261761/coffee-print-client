<template>
<div class='select-device'>
  <form
    class='select-device__body'
    @submit.prevent='onSubmit'
  >
    <InputText
      v-model='deviceCode'
      class = 'select-device__device-code'
      type='text'
      placeholder='XXXXX'
      :label='$t("deviceCode")'
    />

    <Btn
      :disabled='!deviceCode'
      :label='$t("next")'
    />
  </form>

  <footer
    v-if = '$store.state.device.code'
    class='select-device__footer'
  >
    <Btn
      :label = '$t("back")'
      @click = '$router.push({name: "selectPicture", params: {code: $store.state.device.code}})'
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
  methods: {
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
  background-image: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.select-device__body {
  position: relative;
  width: 31.25rem;
  max-width: calc(100% - .625rem);
  margin: auto;
  padding: 2.9375rem 1.25rem 2rem;
}

.select-device__body::before {
  content: '';
  position: absolute;
  top: .3125rem;
  right: .3125rem;
  bottom: .3125rem;
  left: .3125rem;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .25rem;
}

.select-device__device-code {
  width: 250px;
}

.select-device__footer {
  padding-top: .9375rem;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .25rem .25rem 0 0;
}
</style>
