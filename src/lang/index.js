import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  ru: {
    shopCode: 'Код кофепринтера',
    shopName: 'Наименование кофепринтера',
    next: 'Далее',
    back: 'Назад',
    addPicture: 'Добавить изображение',
    scale: 'Маштаб',
    offsetX: 'Смещение по Х',
    offsetY: 'Смещение по Y',
    contrast: 'Контрасность',
    brightness: 'Яркость',
    rotate: 'Вращение',
    balanceColor: 'Баланс цвета',
    sendOnDevice: 'Отправить в устройство'
  }
};

const i18n = new VueI18n({
  locale: 'ru', // set locale
  messages // set locale messages
});

export default i18n;
