<template>
  <Btn
    :label = '$t("sendOnDevice")'
    @click = 'sendFile'
  >
    <portal to = 'FormModalSendSuccess' v-if = 'modalOpen'>
      <FormModalSendSuccess
        @cancel = 'modalOpen = false'
      />
    </portal>
  </Btn>
</template>

<script>
import Btn from '@/components/Btn.vue';
import FormModalSendSuccess from '@/components/FormModalSendSuccess.vue';
import http from '@/utils/http';
import { b64ToUint8Array } from '@/utils/file';

export default {
  name: 'BtnSend',
  props: ['canvas'],
  components: {
    Btn,
    FormModalSendSuccess
  },
  data: () => ({
    modalOpen: false
  }),
  methods: {
    async sendFile() {
      const b64Image = this.canvas.toDataURL('image/jpeg');
      const u8Image = b64ToUint8Array(b64Image);

      const formData = new FormData();
      formData.append('file', new Blob([u8Image], { type: 'image/jpg' }));
      formData.append('shopCode', this.$store.state.shop.id);

      await http.post('/upload', formData);
      this.modalOpen = true;
    }
  }
};
</script>
