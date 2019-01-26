import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
import SelectShop from '@/views/SelectShop.vue';
import SelectPicture from '@/views/SelectPicture.vue';
import EditPicture from '@/views/EditPicture.vue';

Vue.use(Router);

const beforeEnterSelectPicture = async (to, from, next) => {
  if (!store.state.shop.id) {
    await store.dispatch('shop/getShop', { code: to.params.code });
  }
  next();
};

const beforeEnterEditPicture = async (to, from, next) => {
  const routerPath = {};

  const shopCode = store.state.shop.code;

  if (!shopCode) {
    next({ name: 'selectShop' });
    return;
  }

  if (!store.state.file.fileUrl) {
    next({ name: 'selectPicture', params: { code: shopCode } });
    return;
  }

  next(routerPath);
};


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'selectShop' }
    },
    {
      path: '/shop',
      name: 'selectShop',
      component: SelectShop
    },
    {
      path: '/shop/:code',
      name: 'selectPicture',
      component: SelectPicture,
      beforeEnter: beforeEnterSelectPicture
    },
    {
      path: '/edit',
      name: 'editPicture',
      component: EditPicture,
      beforeEnter: beforeEnterEditPicture
    }

    // {
    //   path: "/about",
    //   name: "about",
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
