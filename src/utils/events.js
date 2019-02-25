export const addOnResize = callback => {
  let running = false;

  const runCallbacks = () => {
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

// as long as it continues to be invoked, it will not be triggered
export const debounce = (func, interval = 200) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(func.bind(null, args), interval);
  };
};

export const debounceRAF = func => {
  let running = false;

  const runCallbacks = () => {
    func();
    running = false;
  };

  return () => {
    if (!running) {
      running = true;
      window.requestAnimationFrame(runCallbacks);
    }
  };
};

export default {
  addOnResize,
  removeOnResize,
  debounce,
  debounceRAF
};
