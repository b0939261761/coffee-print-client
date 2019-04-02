<template>
  <div class='select-picture'>
    <div class = 'select-picture__body'>
      <LabelValue
        class = 'label-value--margin'
        :label = 'coffeePrinterTitle'
        :value = '$store.state.device.code'
      />

      <Btn
        :label = 'galleryTitle'
        disabled
      >
        <template #icon>
          <svg
            xmlns = 'http://www.w3.org/2000/svg'
            viewBox = '0 0 576 512'
          >
            <path
              d = 'M480 416v16c0 26.51-21.49 48-48 48H48c-26.51
                   0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v208c0
                   44.112 35.888 80 80
                   80h336zm96-80V80c0-26.51-21.49-48-48-48H144c-26.51 0-48
                   21.49-48 48v256c0 26.51 21.49 48 48 48h384c26.51 0 48-21.49
                   48-48zM256 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48
                   48-48 48 21.49 48 48zm-96 144l55.515-55.515c4.686-4.686
                   12.284-4.686 16.971 0L272 256l135.515-135.515c4.686-4.686
                   12.284-4.686 16.971 0L512 208v112H160v-48z'
            />
          </svg>
        </template>
      </Btn>

      <BtnSelectPicture @change = 'onGoEditPicture' />

      <Btn
        :label = 'backTitle'
        @click = 'onGoSelectDevice'
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
    </div>
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
    coffeePrinterTitle() {
      return this.$t('coffeePrinter');
    },
    galleryTitle() {
      return this.$t('gallery');
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
  background-color: #f7796a;
}

.select-picture__body {
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
  .select-picture__body {
    background-size:
      25.4rem auto,
      calc(100% - 2rem) auto;
  }
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
</style>
