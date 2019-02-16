import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
import SelectDevice from '@/views/SelectDevice.vue';
import SelectPicture from '@/views/SelectPicture.vue';
import EditPicture from '@/views/EditPicture.vue';

Vue.use(Router);

const beforeEnterSelectPicture = async (to, from, next) => {
  if (!store.state.device.id) {
    await store.dispatch('device/getdevice', { code: to.params.code });
  }
  next();
};

const beforeEnterEditPicture = async (to, from, next) => {
  const routerPath = {};

  const deviceCode = store.state.device.code;

  if (!deviceCode) {
    next({ name: 'selectDevice' });
    return;
  }

  if (!store.state.file.fileUrl) {
    next({ name: 'selectPicture', params: { code: deviceCode } });
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
      name: 'selectDevice',
      component: SelectDevice
    },
    {
      path: '/:code',
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
