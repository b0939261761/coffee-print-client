<template>
<FormModal @cancel = '$emit("cancel")'>
  <template slot = 'header'>
    {{ $t('FormModalSendSuccessTitle') }}
  </template>

  <template slot = 'body'>
    {{ $t('FormModalSendSuccessBody')}}
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
  name: 'FormModalSendSuccess',
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
