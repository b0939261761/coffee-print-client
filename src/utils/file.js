// from http://stackoverflow.com/a/32490603
export const getOrientationImage = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = event => {
    const view = new DataView(event.target.result);

    if (view.getUint16(0, false) !== 0xFFD8) resolve(0); // not JPEG

    const length = view.byteLength;
    let offset = 2;

    while (offset < length) {
      const marker = view.getUint16(offset, false);
      offset += 2;

      if (marker === 0xFFE1) {
        offset += 2;
        if (view.getUint32(offset, false) !== 0x45786966) resolve(0);

        const little = view.getUint16(offset += 6, false) === 0x4949;
        offset += view.getUint32(offset + 4, little);
        const tags = view.getUint16(offset, little);
        offset += 2;

        for (let i = 0; i < tags; i++) {
          if (view.getUint16(offset + (i * 12), little) === 0x0112) {
            resolve(view.getUint16(offset + (i * 12) + 8, little));
          }
        }
      } else if ((marker & 0xFF00) !== 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
    resolve(0);
  };

  reader.onerror = error => reject(error);
  reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
});

// ----------------------------------------------------------

export const getBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = event => resolve(event.target.result);
  reader.onerror = error => reject(error);
  reader.readAsDataURL(file);
});

// ----------------------------------------------------------

export const loadImage = src => new Promise((resolve, reject) => {
  try {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = error => reject(error);
    image.src = src;
  } catch (error) {
    reject(error);
  }
});

// ----------------------------------------------------------

export const loadImageToDataUrl = url => new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = url;
  img.onerror = error => reject(error);
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);

    resolve(canvas.toDataURL('image/jpeg'));
  };
});

// ----------------------------------------------------------

export const b64ToUint8Array = b64Image => {
  const img = atob(b64Image.split(',')[1]);

  const imgBuffer = [];

  for (let i = 0; i < img.length; ++i) {
    imgBuffer.push(img.charCodeAt(i));
  }
  return new Uint8Array(imgBuffer);
};

// ----------------------------------------------------------

export default {
  getOrientationImage,
  getBase64,
  loadImage,
  loadImageToDataUrl,
  b64ToUint8Array
};
