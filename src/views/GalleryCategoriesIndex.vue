<template>
  <ul class = 'gallery-categories-index'>
    <li
      v-for = 'category in categories'
      :key = 'category.id'
      :data-id = 'category.id'
      class = 'gallery-categories-index__item'
      @click = 'onGoGalleryPictures'
    >
      <img
        src = 'http://localhost:4000/2657048.png'
        :alt = 'category.name'
        class = 'gallery-categories-index__img'
      >
      <span class = 'gallery-categories-index__name'>
        {{ category.name }}
      </span>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'GalleryCategoriesIndex',
  data: () => ({
    categories: [
      {
        id: 1,
        name: '8 Березня'
      },
      {
        id: 2,
        name: '14 жовтня'
      },
      {
        id: 3,
        name: 'Для неї'
      },
      {
        id: 4,
        name: 'Для нього'
      },
      {
        id: 12,
        name: 'Великдень'
      },
      {
        id: 5,
        name: 'День Незалежності'
      },
      {
        id: 6,
        name: 'Приколи'
      },
      {
        id: 7,
        name: 'Смайли'
      },
      {
        id: 8,
        name: 'Трійця'
      },
      {
        id: 9,
        name: 'Новий Рік'
      },
      {
        id: 10,
        name: 'Різдво'
      }
    ]
  }),
  methods: {
    onGoGalleryPictures(event) {
      this.$router.push({ name: 'galleryPictures', params: { id: event.currentTarget.dataset.id } });
    }
  }
};
</script>

<style scoped>
.gallery-categories-index {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: .8rem 0;
  overflow-y: auto;
  list-style: none;
  background-color: rgba(255, 255, 255, .6);
}

.gallery-categories-index::before,
.gallery-categories-index::after {
  content: '';
  margin: auto 0;
}

.gallery-categories-index__item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: .8rem 1.6rem;
  transition: background-color .3s cubic-bezier(.25, .8, .5, 1);
  user-select: none;
}

.gallery-categories-index__item:hover {
  background: rgba(0, 0, 0, .04);
  cursor: pointer;
}

.gallery-categories-index__item:not(:last-of-type)::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 5.6rem;
  height: .08rem;
  background-color: rgba(0, 0, 0, .1);
}

.gallery-categories-index__img {
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  margin-right: 1.6rem;
  background-color: #fff;
  border-radius: 50%;
  object-fit: contain;
}

.gallery-categories-index__name {
  flex-grow: 1;
  font-size: 1.6rem;
  text-align: left;
  color: rgba(0, 0, 0, .87);
  user-select: none;
}
</style>
