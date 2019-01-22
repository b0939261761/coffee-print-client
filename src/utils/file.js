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

export default {
  getBase64
};
