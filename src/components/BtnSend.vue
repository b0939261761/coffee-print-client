<template>
  <Btn
    :label = 'buttonTitle'
    @click = 'sendFile'
  >
    <portal
      v-if = 'modalOpen'
      to = 'FormModalSendSuccess'
    >
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
  components: {
    Btn,
    FormModalSendSuccess
  },
  props: {
    canvas: {
      required: true,
      validator: prop => prop === null || typeof prop === 'object'
    }
  },
  data: () => ({
    modalOpen: false
  }),
  computed: {
    buttonTitle() {
      return this.$t('sendOnDevice');
    }
  },
  methods: {
    async sendFile() {
      const b64Image = this.canvas.toDataURL('image/jpeg');
      const u8Image = b64ToUint8Array(b64Image);

      const formData = new FormData();
      formData.append('file', new Blob([u8Image], { type: 'image/jpg' }));

      await http.post(`/devices/${this.$store.state.device.id}/pictures`, formData);
      this.modalOpen = true;
    }
  }
};
</script>
