import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
import Shop from '@/views/Shop.vue';
import SelectPicture from '@/views/SelectPicture.vue';

Vue.use(Router);

const beforeEnterSelectPicture = async (to, from, next) => {
  if (!store.state.shop.id) {
    await store.dispatch('shop/getShop', { code: to.params.code });
  }
  next();
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
    }

    // {
    //   path: "/about",
    //   name: "about",
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
