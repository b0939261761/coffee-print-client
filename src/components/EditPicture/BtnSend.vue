<template>
  <Btn
    :label = 'buttonTitle'
    @click = 'sendFile'
  >
    <template #icon>
      <svg
        xmlns = 'http://www.w3.org/2000/svg'
        viewBox = '0 0 512 512'
      >
        <path
          d = 'M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8
               0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5
               27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0
               13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24
               24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24
               24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1
               56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20
               9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20
               9-20 20 9 20 20 20 20-9 20-20z'
        />
      </svg>
    </template>

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
import Btn from '@/components/Base/Btn.vue';
import FormModalSendSuccess from '@/components/EditPicture/FormModalSendSuccess.vue';
import { sendPicture } from '@/utils/http';
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

      await sendPicture(this.$store.state.device.id, formData);
      this.modalOpen = true;
    }
  }
};
</script>
