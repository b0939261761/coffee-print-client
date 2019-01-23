export const getBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
  reader.readAsDataURL(file);
});

export const loadImage = src => new Promise((resolve, reject) => {
  try {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = src;
  } catch (error) {
    reject(error);
  }
});

export const b64ToUint8Array = b64Image => {
  const img = atob(b64Image.split(',')[1]);

  const imgBuffer = [];

  for (let i = 0; i < img.length; ++i) {
    imgBuffer.push(img.charCodeAt(i));
  }
  return new Uint8Array(imgBuffer);
};

export default {
  getBase64,
  loadImage,
  b64ToUint8Array
};
