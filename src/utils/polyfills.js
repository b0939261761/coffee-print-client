// Полифилл псевдокласса :placeholder-shown
(() => {
  const isCheck = () => {
    try {
      document.querySelector(':placeholder-shown');
    } catch (error) {
      if (error instanceof DOMException) return false;
      throw new Error(error);
    }
    return true;
  };

  const changeClass = el => el.classList[el.value ? 'remove' : 'add']('placeholder-shown');

  const placeholderShownPolyfill = () => {
    document.querySelectorAll('[placeholder]').forEach(el => {
      changeClass(el);
      ['change', 'keyup'].forEach(type => {
        el.addEventListener(type, ({ target }) => changeClass(target));
      });
    });
  };

  if (!isCheck()) window.addEventListener('load', placeholderShownPolyfill);
})();
