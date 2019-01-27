<template>
  <Btn
    :label = '$t("sendOnDevice")'
    @click = 'sendFile'
  >
    <portal to = 'modal' v-if = 'modalOpen'>
      <FormModalSend
        @cancel = 'modalOpen = false'
        v-if = 'modalOpen'
      />
    </portal>
  </Btn>
</template>

<script>
import Btn from '@/components/Btn.vue';
import FormModalSend from '@/components/FormModalSend.vue';
import http from '@/utils/http';
import { b64ToUint8Array } from '@/utils/file';

export default {
  name: 'BtnSend',
  props: ['canvas'],
  components: {
    Btn,
    FormModalSend
  },
  data: () => ({
    modalOpen: false
  }),
  methods: {
    async sendFile() {
      // const b64Image = this.canvas.toDataURL('image/jpeg');
      // const u8Image = b64ToUint8Array(b64Image);

      // const formData = new FormData();
      // formData.append('file', new Blob([u8Image], { type: 'image/jpg' }));
      // formData.append('shopCode', 1);
      // formData.append('shopCode', this.$store.state.shop.id);

      // const result = await http.post('/upload', formData);
      this.modalOpen = true;
      // console.log(`${process.env.VUE_APP_BASE_URL}/file/${result.data.fileName}`);
    }
  }
};
</script>
