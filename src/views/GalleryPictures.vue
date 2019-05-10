<template>
  <div class = 'gallery-pictures'>
    <ul class = 'gallery-pictures__wrapper-item'>
      <li
        v-for = 'picture in pictures'
        :key = 'picture'
        :data-id = 'picture'
        class = 'gallery-pictures__item'
        @click = 'onGoGalleryPictures'
      >
        <img
          :src = 'picture'
          class = 'gallery-pictures__img'
        >
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'GalleryPictures',
  data: () => ({
    // pictures: ['/1.png', '/2.png']
    pictures: ['/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png', '/7.png', '/8.png', '/9.png']
  }),
  methods: {
    onGoGalleryPictures(event) {
      this.$store.commit('file/setFileUrl', { url: event.currentTarget.dataset.id });
      this.$store.commit('file/setOrientation', { orientation: 0 });
      this.$router.push({ name: 'editPicture' });
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
