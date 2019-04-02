<template>
  <div class = 'btn-select-picture'>
    <Btn
      ref = 'btn'
      :label = 'selectPictureTitle'
      @click = 'openDialog'
    >
      <template #icon>
        <svg
          xmlns = 'http://www.w3.org/2000/svg'
          viewBox = '0 0 576 512'
        >
          <path
            d = 'M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989
                 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64
                 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73
                 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49
                 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25
                 117.989 224 152 224z'
          />
        </svg>
      </template>
    </Btn>

    <input
      ref = 'file'
      type = 'file'
      class = 'file'
      :accept = '$options.accept'
      @change = 'selectedPicture'
    >

    <portal
      v-if = 'modalOpen'
      to = 'formModal'
    >
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
  computed: {
    selectPictureTitle() {
      return this.$t('selectPicture');
    }
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
  created() {
    this.allowedTypes = ['image/jpeg', 'image/png'];
    this.$options.accept = this.allowedTypes.join(',');
  },
  methods: {
    openDialog() {
      this.$refs.file.click();
    },
    async selectedPicture(event) {
      const { files } = event.target;
      const file = files[0];

      if (!file) return;

      if (this.allowedTypes.includes(file.type)) {
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
.btn-select-picture {
  width: 100%;
}

.file {
  display: none;
}
</style>
