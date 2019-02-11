import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  ru: {
    deviceCode: 'Код кофепринтера',
    deviceName: 'Наименование кофепринтера',
    next: 'Далее',
    back: 'Назад',
    selectPicture: 'Выбрать изображение',
    scale: 'Маштаб',
    offsetX: 'Смещение Влево/Вправо',
    offsetY: 'Смещение Вверх/Вниз',
    contrast: 'Контрасность',
    brightness: 'Яркость',
    rotate: 'Вращение',
    noise: 'Шум',
    balanceColor: 'Баланс цвета',
    sendOnDevice: 'Отправить',
    rollUp: 'Свернуть',
    FormModalSendSuccessTitle: 'Изображение передано на устройство.',
    FormModalSendSuccessBody: 'Выбрать новое изображение или продолжить редактировать?',
    cancel: 'Отмена',
    ok: 'ok',
    selectPictureErrorTitle: 'Ошибка открытия файла',
    selectPictureErrorBody: 'Поддерживаются изображения только PNG и JPEG'
  }
};

const i18n = new VueI18n({
  locale: 'ru', // set locale
  messages // set locale messages
});

export default i18n;
