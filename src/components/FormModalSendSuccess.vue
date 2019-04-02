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
        @change = 'onCancel'
      />

      <Btn
        :label = 'cancelTitle'
        color-theme = 'outline'
        @click = 'onCancel'
      >
        <template #icon>
          <svg
            xmlns = 'http://www.w3.org/2000/svg'
            viewBox = '0 0 352 512'
          >
            <path
              d = 'M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19
                   0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48
                   0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48
                   0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28
                   256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24
                   22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07
                   100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28
                   12.28-32.19 0-44.48L242.72 256z'
            />
          </svg>
        </template>
      </Btn>
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
  },
  computed: {
    formModalSendSuccessTitle() {
      return this.$t('formModalSendSuccessTitle');
    },
    formModalSendSuccessBody() {
      return this.$t('formModalSendSuccessBody');
    },
    cancelTitle() {
      return this.$t('cancel');
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
