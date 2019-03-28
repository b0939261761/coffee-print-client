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
  padding: 2rem 0 0 2rem;
  text-align: left;
  color: white;
  background-color: rgba(0, 0, 0, .6);
  border-radius: 0 0 .4rem .4rem;
}

.device-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 102.4rem;
  margin: 0 auto;
}

.select-picture__body {
  position: relative;
  width: 50rem;
  max-width: calc(100% - 1rem);
  margin: auto;
  padding: 4.7rem 2rem 3.2rem;
}

.select-picture__body::before {
  content: '';
  position: absolute;
  top: .5rem;
  right: .5rem;
  bottom: .5rem;
  left: .5rem;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .4rem;
}

.select-picture__footer {
  padding-top: 1.5rem;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .4rem .4rem 0 0;
}
</style>
