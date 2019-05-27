export default {
  coffeePrinter: 'Coffee printer',
  next: 'Next',
  back: 'Back',
  selectPicture: 'Select image',
  scale: 'Scale',
  sendOnDevice: 'Send',
  formModalSendSuccessTitle: 'The image is transferred to the device',
  formModalSendSuccessBody: 'Select a new image or continue editing?',
  cancel: 'Cancel',
  ok: 'ok',
  gallery: 'Gallery',
  errors: {
    HTTP: {
      title: 'Communication error with the site',
      message: '%{statusCode} "%{method} %{url}"'
    },
    NETWORK: {
      title: 'Connection error',
      message: 'Check your Internet connection'
    },
    DEVICE_NOT_FOUND: {
      title: 'Coffeprinter not found',
      message: 'Check the correctness of the entered code or take a picture of the QR on the coffee printer screen'
    },
    FILE_TYPE: {
      title: 'Error opening file',
      message: 'Only PNG and JPEG images are supported'
    }
  }
};
