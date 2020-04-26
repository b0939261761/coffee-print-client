<template>
  <div class = 'gallery-pictures'>
    <ul class = 'gallery-pictures__wrapper-item'>
      <li
        v-for = 'picture in pictures'
        :key = 'picture'
        :data-url = 'picture'
        class = 'gallery-pictures__item'
        @click = 'onGoGalleryPictures'
      >
        <img
          crossOrigin='anonymous'
          :src = 'picture'
          class = 'gallery-pictures__img'
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { getGalleryPictures } from '@/utils/http';
import { loadImageToDataUrl } from '@/utils/file';

export default {
  name: 'GalleryPictures',
  data: () => ({
    pictures: []
  }),
  async created() {
    const response = await getGalleryPictures(this.$route.params.id);
    const pictures = response.data && response.data.items ? response.data.items : [];
    const url = process.env.VUE_APP_BASE_URL;
    this.pictures = pictures.map(id => `${url}/galleries/pictures/${id}`);
  },
  methods: {
    async onGoGalleryPictures(event) {
      const url = await loadImageToDataUrl(event.currentTarget.dataset.url);
      this.$store.commit('file/setFileUrl', { url });
      this.$store.commit('file/setOrientation', { orientation: 0 });
      this.$router.push({ name: 'editPicture', query: { autofit: true } });
    }
  }
};
</script>

<style scoped>
.gallery-pictures {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100%;
  padding: 1rem 0 0 1rem;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, .6);
}

.gallery-pictures__wrapper-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  padding: 0;
  list-style: none;
}

.gallery-pictures__item {
  position: relative;
  width: 100%;
  max-width: 20rem;
  max-height: 20rem;
  margin: 0 1rem 1rem 0;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: .2rem .2rem .5rem 0 rgba(0, 0, 0, .5);
  cursor: pointer;
  user-select: none;
}

.gallery-pictures__item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color .3s cubic-bezier(.25, .8, .5, 1);
}

.gallery-pictures__item:hover::after {
  background: rgba(0, 0, 0, .1);
}

.gallery-pictures__img {
  display: block;
  width: 100%;
}
</style>
