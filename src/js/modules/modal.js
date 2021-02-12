'use strict';

(()=> {
  const modal = document.querySelector('.modal');
  const contactBtn = document.querySelector('.contact__btn');
  if (!modal && !contactBtn) {
    return;
  }

  const modalBtnClose = modal.querySelector('.modal__close');

  const closeModal = () => {
    modal.classList.remove('modal--show');
    window.removeEventListener('keydown', escKeydownHandler);
    document.body.classList.remove('stop-scroll');
  };

  const escKeydownHandler = (evt) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closeModal();
    }
  };

  const contactBtnClickHandler = () => {
    modal.classList.add('modal--show');
    window.addEventListener('keydown', escKeydownHandler);
    document.body.classList.add('stop-scroll');
  };

  const modalBtnCloseClickHandler = () => {
    closeModal();
  };

  const modalClickHandler = (evt) => {
    if (evt.target === modal) {
      closeModal();
    }
  };

  contactBtn.addEventListener('click', contactBtnClickHandler);
  modalBtnClose.addEventListener('click', modalBtnCloseClickHandler);
  modal.addEventListener('click', modalClickHandler);
})();
