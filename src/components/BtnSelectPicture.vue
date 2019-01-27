<template>
<div>
  <Btn
    :label = '$t("selectPicture")'
     @click = 'openDialog'
     ref = 'btn'
  />

  <input
    type = 'file'
    ref = 'file'
    class = 'file'
    @change = 'selectedPicture'
    :accept = '$options.allowedTypes.join(",")'
  />

  <portal to = 'formModal' v-if = 'modalOpen'>
    <FormModalErrorTypeFile @cancel = 'modalOpen = false' />
  </portal>
</div>
</template>

<script>
import Btn from '@/components/Btn.vue';
import FormModalErrorTypeFile from '@/components/FormModalErrorTypeFile.vue';

export default {
  name: 'BtnSelectPicture',
  components: {
    Btn,
    FormModalErrorTypeFile
  },
  data: () => ({
    modalOpen: false
  }),
  created() {
    this.$options.allowedTypes = ['image/jpeg', 'image/png'];
  },
  watch: {
    modalOpen(value) {
      // Потому что эта кнопка фактически может быть на модальной форме
      // где может тоже быть ошибка
      // поэтому нам нужно при закрытии модалки с ошибкой - вернуть фокус
      // что бы по ESC можно было закрыть модалку с этой кнопкой
      if (!value) this.$refs.btn.$el.focus();
    }
  },
  methods: {
    openDialog() {
      this.$refs.file.click();
    },
    async selectedPicture(event) {
      const { files } = event.target;
      const file = files[0];

      if (!file) return;

      if (this.$options.allowedTypes.includes(file.type)) {
        await this.$store.dispatch('file/getFileUrl', { file });
        this.$emit('change');
      } else {
        this.modalOpen = true;
      }
    }
  }
};
</script>

<style scoped>
.file {
  display: none;
}
</style>
