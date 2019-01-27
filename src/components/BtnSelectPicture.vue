<template>
<div>
  <Btn
    :label='$t("selectPicture")'
     @click='openDialog'
  />

  <input
    type='file'
    ref='file'
    class='file'
    @change='selectedPicture'
    :accept='allowedTypes.join(",")'
  />
</div>
</template>

<script>
import Btn from '@/components/Btn.vue';

export default {
  name: 'BtnSelectPicture',
  components: {
    Btn
  },
  data: () => ({
    allowedTypes: ['image/jpeg', 'image/png']
  }),
  methods: {
    openDialog() {
      this.$refs.file.click();
    },
    async selectedPicture(event) {
      const { files } = event.target;
      const file = files[0];

      if (file && this.allowedTypes.includes(file.type)) {
        await this.$store.dispatch('file/getFileUrl', { file });
        this.$emit('change');
        // this.$router.push({ name: 'editPicture' });
        console.log('Только изображения можно выбирать!');
      } else {
        console.log('Только изображения можно выбирать!');
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
