import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
import Shop from '@/views/Shop.vue';
import SelectPicture from '@/views/SelectPicture.vue';
import EditorPicture from '@/views/EditorPicture.vue';

import { getBase64 } from '@/utils/file';

Vue.use(Router);

const beforeEnterSelectPicture = async (to, from, next) => {
  if (!store.state.shop.id) {
    await store.dispatch('shop/getShop', { code: to.params.code });
  }
  next();
};

const beforeEnterEditorPicture = async (to, from, next) => {
  const routerPath = {};
  const { originalFile } = store.state.file;
  if (originalFile) {
    if (!store.state.file.fileUrl) {
      const fileUrl = await getBase64(originalFile);
      store.commit('file/setFileUrl', { url: fileUrl });
    }
  } else {
    const shopCode = store.state.shop.code;

    if (shopCode) {
      routerPath.name = 'selectPicture';
      routerPath.params = { code: shopCode };
    } else {
      routerPath.name = 'shop';
    }
  }

  next(routerPath);
};


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'shop' }
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/shop/:code',
      name: 'selectPicture',
      component: SelectPicture,
      beforeEnter: beforeEnterSelectPicture
    },
    {
      path: '/editor',
      name: 'editorPicture',
      component: EditorPicture,
      beforeEnter: beforeEnterEditorPicture
    }

    // {
    //   path: "/about",
    //   name: "about",
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
