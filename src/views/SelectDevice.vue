<template>
  <div class = 'select-device'>
    <SelectLanguage />

    <form
      class = 'select-device__form'
      @submit.prevent = 'onSubmit'
    >
      <InputText
        v-model = 'code'
        type = 'text'
        placeholder = 'XXXXX'
        :label = 'coffeePrinterTitle'
        inputmode = 'numeric'
      />

      <BtnNext
        :disabled = '!code'
        @click = 'onSubmit'
      />

      <BtnBack
        v-if = '$store.state.device.id'
        @click = 'onGoSelectPicture'
      />
    </form>
  </div>
</template>

<script>
import InputText from '@/components/Base/InputText.vue';
import BtnNext from '@/components/Common/BtnNext.vue';
import BtnBack from '@/components/Common/BtnBack.vue';
import SelectLanguage from '@/components/Common/SelectLanguage.vue';

export default {
  name: 'SelectDevice',
  components: {
    InputText,
    BtnNext,
    BtnBack,
    SelectLanguage
  },
  data: () => ({
    code: ''
  }),
  computed: {
    coffeePrinterTitle() {
      return this.$t('coffeePrinter');
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({ name: 'selectPictureIndex', params: { code: this.code } });
      this.code = '';
    },
    onGoSelectPicture() {
      this.$router.push({ name: 'selectPictureIndex', params: { code: this.$store.state.device.code } });
    }
  }
};
</script>

<style scoped>
.select-device {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.select-device__form {
  max-width: 20rem;
}
</style>
