<template>
  <div class = 'select-picture-index'>
    <SelectLanguage />

    <div>
      <LabelValue
        :label = 'coffeePrinterTitle'
        :value = '$store.state.device.code'
      />

      <BtnSelectPicture @click = 'onGoEditPicture' />

      <BtnSelectGallery @click = 'onGoGalleryCategories' />

      <BtnBack @click = 'onGoSelectDevice' />
    </div>
  </div>
</template>

<script>
import SelectLanguage from '@/components/Common/SelectLanguage.vue';
import LabelValue from '@/components/SelectPicture/LabelValue.vue';
import BtnSelectPicture from '@/components/SelectPicture/BtnSelectPicture.vue';
import BtnSelectGallery from '@/components/SelectPicture/BtnSelectGallery.vue';
import BtnBack from '@/components/Common/BtnBack.vue';

export default {
  name: 'SelectPictureIndex',
  components: {
    SelectLanguage,
    LabelValue,
    BtnSelectPicture,
    BtnSelectGallery,
    BtnBack
  },
  computed: {
    coffeePrinterTitle() {
      return this.$t('coffeePrinter');
    }
  },
  methods: {
    onGoSelectDevice() {
      this.$router.push({ name: 'selectDevice' });
    },
    onGoEditPicture() {
      this.$router.push({ name: 'editPicture' });
    },
    onGoGalleryCategories() {
      this.$router.push({ name: 'galleryCategoriesIndex' });
    }
  }
};
</script>

<style scoped>
.select-picture-index {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
