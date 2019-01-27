<template>
<FormModal>
  <template slot = 'header'>
    {{ $t('sendPictureSuccess') }}
  </template>

  <template slot = 'body'>
    {{ $t('sendPictureSelect')}}
  </template>

  <template slot ='footer'>
    <BtnSelectPicture
      class = 'btn-selected-picture--margin'
      @change = '$emit("cancel")'
    />

    <Btn
      :label = '$t("cancel")'
      colorTheme = 'outline'
      @click = '$emit("cancel")'
    />
  </template>

</FormModal>
</template>

<script>
import Btn from '@/components/Btn.vue';
import BtnSelectPicture from '@/components/BtnSelectPicture.vue';
import FormModal from '@/components/FormModal.vue';

export default {
  name: 'ModalFormSend',
  components: {
    Btn,
    BtnSelectPicture,
    FormModal
  }
};
</script>


<style scoped>
.btn-selected-picture--margin {
  margin-right: 1rem;
}
</style>
