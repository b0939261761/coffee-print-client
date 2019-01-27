<template>
<FormModal @cancel = '$emit("cancel")'>
  <template slot = 'header'>
    {{ $t('selectPictureErrorTitle') }}
  </template>

  <template slot = 'body'>
    {{ $t('selectPictureErrorBody')}}
  </template>

  <template slot ='footer'>
    <Btn
      :label = '$t("ok")'
      @click = '$emit("cancel")'
    />
  </template>
</FormModal>
</template>

<script>
import Btn from '@/components/Btn.vue';
import FormModal from '@/components/FormModal.vue';

export default {
  name: 'FormModalErrorTypeFile',
  components: {
    Btn,
    FormModal
  }
};
</script>
