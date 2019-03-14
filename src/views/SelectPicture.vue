<template>
  <div class='select-picture'>
    <header class='select-picture__header'>
      <div class = 'device-info'>
        <LabelValue
          class = 'label-value--margin'
          :label = 'deviceCodeTitle'
          :value = '$store.state.device.code'
        />

        <LabelValue
          :label = 'deviceNameTitle'
          :value = '$store.state.device.name'
        />
      </div>
    </header>

    <div class='select-picture__body'>
      <BtnSelectPicture @change = 'onGoEditPicture' />
    </div>

    <footer class='select-picture__footer'>
      <Btn
        :label = 'backTitle'
        @click = 'onGoSelectDevice'
      />
    </footer>
  </div>
</template>

<script>
import BtnSelectPicture from '@/components/BtnSelectPicture.vue';
import LabelValue from '@/components/LabelValue.vue';
import Btn from '@/components/Btn.vue';

export default {
  name: 'SelectPicture',
  components: {
    BtnSelectPicture,
    LabelValue,
    Btn
  },
  computed: {
    deviceCodeTitle() {
      return this.$t('deviceCode');
    },
    deviceNameTitle() {
      return this.$t('deviceName');
    },
    backTitle() {
      return this.$t('back');
    }
  },
  methods: {
    onGoSelectDevice() {
      this.$router.push({ name: 'selectDevice' });
    },
    onGoEditPicture() {
      this.$router.push({ name: 'editPicture' });
    }
  }
};
</script>

<style scoped>
.select-picture {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-image: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.select-picture__header {
  width: 100%;
  padding: 1.25rem 0 0 1.25rem;
  text-align: left;
  color: white;
  background-color: rgba(0, 0, 0, .6);
  border-radius: 0 0 .25rem .25rem;
}

.device-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
}

.select-picture__body {
  position: relative;
  width: 31.25rem;
  max-width: calc(100% - .625rem);
  margin: auto;
  padding: 2.9375rem 1.25rem 2rem;
}

.select-picture__body::before {
  content: '';
  position: absolute;
  top: .3125rem;
  right: .3125rem;
  bottom: .3125rem;
  left: .3125rem;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .25rem;
}

.select-picture__footer {
  padding-top: .9375rem;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .25rem .25rem 0 0;
}
</style>
