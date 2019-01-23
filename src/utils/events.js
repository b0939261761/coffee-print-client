export const addOnResize = callback => {
  let running = false;

  const runCallbacks = () => {
    console.log(1);
    callback();

    running = false;
  };

  const eventCb = () => {
    if (!running) {
      running = true;
      window.requestAnimationFrame(runCallbacks);
    }
  };

  window.addEventListener('resize', eventCb);

  return eventCb;
};

export const removeOnResize = eventCb => window.removeEventListener('resize', eventCb);

export default {
  addOnResize,
  removeOnResize
};
