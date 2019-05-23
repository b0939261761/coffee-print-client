import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
import SelectDevice from '@/views/SelectDevice.vue';
import SelectPicture from '@/views/SelectPicture.vue';
import SelectPictureIndex from '@/views/SelectPictureIndex.vue';
import GalleryCategories from '@/views/GalleryCategories.vue';
import GalleryCategoriesIndex from '@/views/GalleryCategoriesIndex.vue';
import GalleryPictures from '@/views/GalleryPictures.vue';
import EditPicture from '@/views/EditPicture.vue';

import { getDevice } from '@/utils/http';

Vue.use(Router);

const beforeEnterSelectPicture = async (to, from, next) => {
  const { code } = to.params;
  const route = { };

  if (code !== store.state.device.code || !store.state.device.id) {
    try {
      const response = await getDevice(code);
      if (response.data) {
        store.commit('device/setDevice', response.data);
      } else {
        store.commit('errors/add', { code: 'DEVICE_NOT_FOUND' });
        route.name = 'selectDevice';
      }
    } catch (err) {
      route.name = 'selectDevice';
    }
  }

  next(route);
};

const beforeEnterEditPicture = (to, from, next) => {
  const route = { };

  if (!store.state.file.fileUrl) {
    route.name = 'selectPictureIndex';
    route.params = { code: to.params.code };
  }

  next(route);
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'selectDevice',
      component: SelectDevice
    },
    {
      path: '/:code',
      component: SelectPicture,
      beforeEnter: beforeEnterSelectPicture,
      children: [
        {
          path: '',
          name: 'selectPictureIndex',
          component: SelectPictureIndex
        },
        {
          path: 'edit',
          name: 'editPicture',
          component: EditPicture,
          beforeEnter: beforeEnterEditPicture,
          props: route => ({ autofit: route.query.autofit })
        },
        {
          path: 'galleries',
          component: GalleryCategories,
          children: [
            {
              path: '',
              name: 'galleryCategoriesIndex',
              component: GalleryCategoriesIndex
            },
            {
              path: ':id',
              name: 'galleryPictures',
              component: GalleryPictures
            }
          ]
        },
        {
          path: '*',
          redirect: { name: 'selectPictureIndex' }
        }
      ]
    }
  ]
});
