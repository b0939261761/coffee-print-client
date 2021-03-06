export default {
  coffeePrinter: 'Кофепринтер',
  next: 'Далее',
  back: 'Назад',
  selectPicture: 'Выбрать изображение',
  scale: 'Маштаб',
  sendOnDevice: 'Отправить',
  formModalSendSuccessTitle: 'Изображение передано на устройство',
  formModalSendSuccessBody: 'Выбрать новое изображение или продолжить редактировать?',
  cancel: 'Отмена',
  ok: 'ok',
  gallery: 'Галерея',
  errors: {
    HTTP: {
      title: 'Ошибка связи с сайтом',
      message: '%{statusCode} "%{method} %{url}"'
    },
    NETWORK: {
      title: 'Ошибка соединения',
      message: 'Проверьте наличие соединения с интернетом'
    },
    DEVICE_NOT_FOUND: {
      title: 'Кофепринтер не найден',
      message: 'Проверьте правильность введеного кода или сфотографируйте QR на экране кофепринтера'
    },
    FILE_TYPE: {
      title: 'Ошибка открытия файла',
      message: 'Поддерживаются изображения только PNG и JPEG'
    }
  }
};
