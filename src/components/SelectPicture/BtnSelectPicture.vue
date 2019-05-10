<template>
  <div class = 'btn-select-picture'>
    <Btn
      ref = 'btn'
      :label = 'label'
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
      class = 'btn-select-picture__file'
      :accept = '$options.accept'
      @change = 'selectedPicture'
    >
  </div>
</template>

<script>
import Btn from '@/components/Base/Btn.vue';

export default {
  name: 'BtnSelectPicture',
  components: {
    Btn
  },
  computed: {
    label() {
      return this.$t('selectPicture');
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
      const file = event.target.files[0];

      if (!file) return;

      if (this.allowedTypes.includes(file.type)) {
        await this.$store.dispatch('file/getFileUrl', { file });
        this.$emit('click');
      } else {
        this.$store.commit('errors/add', { code: 'FILE_TYPE' });
      }
    }
  }
};
</script>

<style scoped>
.btn-select-picture {
  width: 100%;
}

.btn-select-picture__file {
  display: none;
}
</style>
