<template>
  <FormModal @cancel = 'onCancel'>
    <template slot = 'header'>
      {{ formModalSendSuccessTitle }}
    </template>

    <template slot = 'body'>
      {{ formModalSendSuccessBody }}
    </template>

    <template slot ='footer'>
      <BtnSelectPicture
        class = 'btn-selected-picture--margin'
        @click = 'onCancel'
      />

      <BtnCancel
        color-theme = 'outline'
        @click = 'onCancel'
      />
    </template>
  </FormModal>
</template>

<script>
import BtnSelectPicture from '@/components/SelectPicture/BtnSelectPicture.vue';
import BtnCancel from '@/components/Common/BtnCancel.vue';
import FormModal from '@/components/Common/FormModal.vue';

export default {
  name: 'FormModalSendSuccess',
  components: {
    FormModal,
    BtnSelectPicture,
    BtnCancel
  },
  computed: {
    formModalSendSuccessTitle() {
      return this.$t('formModalSendSuccessTitle');
    },
    formModalSendSuccessBody() {
      return this.$t('formModalSendSuccessBody');
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.btn-selected-picture--margin {
  margin-right: 1.6rem;
}
</style>
