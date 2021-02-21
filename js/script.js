'use strict';

(()=> {
  const banners = document.querySelectorAll('.banner');
  if (!banners.length) {
    return;
  }

  banners.forEach((banner) => {
    const container = banner.querySelector('.swiper-container');
    const btn = banner.querySelector('.banner__btn-buy');

    const swiper = new Swiper(container, { // eslint-disable-line no-undef
      loop: true,
      speed: 800,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        bulletActiveClass: 'banner__controls-btn--actv',
        bulletClass: 'banner__controls-btn',
        bulletElement: 'button',
        clickable: true,
      },
    });

    swiper.on('activeIndexChange', (swiperObj) => {
      const index = swiperObj.activeIndex;
      const slide = swiperObj.slides[index];
      document.body.style.backgroundColor = slide.dataset.bgColor;
      btn.ariaLabel = `Купить ${slide.dataset.product}`;
    });
  });
})();

'use strict';

(()=> {
  const filters = document.querySelectorAll('.filters');
  if (!filters.length) {
    return;
  }

  // slider
  filters.forEach((filter) => {
    const slider = filter.querySelector('#slider');
    if (!slider) {
      return;
    }

    const title = filter.querySelector('.filters__title--price');
    const inputMin = filter.querySelector('.filters__price--min');
    const inputMax = filter.querySelector('.filters__price--max');

    noUiSlider.create(slider, { // eslint-disable-line no-undef
      start: [Number(inputMin.value), Number(inputMax.value)],
      connect: true,
      range: {
        min: Number(inputMin.min),
        max: Number(inputMin.max),
      },
      format: {
        to(value) {
          return Math.round(value);
        },
        from(value) {
          return value;
        },
      },
    });

    slider.noUiSlider.on('update', (values, handle) => {
      switch (handle) {
        case 0:
          inputMin.value = values[0];
          break;
        case 1:
          inputMax.value = values[1];
          break;
      }
      title.textContent = `Цена: ${values[0]} ₽ – ${values[1]} ₽:`;
    });
  });
})();

'use strict';

(()=> {
  const mapSections = document.querySelectorAll('.map');
  if (!mapSections.length) {
    return;
  }

  mapSections.forEach((mapSection) => {
    const map = mapSection.querySelector('.map__yandex');
    if (!map) {
      return;
    }

    const init = () => {
      const myMap = new ymaps.Map(map, { // eslint-disable-line no-undef
        // координаты центра карты
        center: [59.939261, 30.329167],
        // масштаб
        zoom: 16,
        // отображения эл. управления
        controls: ['zoomControl', 'rulerControl', 'routeButtonControl'],
        // типы взаимод. с картой
        behaviors: ['dblClickZoom', 'drag', 'MultiTouch'],
      });

      // настройка метки
      const myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {}, { // eslint-disable-line no-undef
        iconLayout: 'default#image',
        iconImageHref: 'img/icon-pin.svg',
        iconImageSize: [80, 140],
        iconImageOffset: [-40, -140],
      });

      // добавление метки
      myMap.geoObjects.add(myPlacemark);
      // запретить интерактивность к другим данным на карте
      myMap.options.set('yandexMapDisablePoiInteractivity', true);
      // создает элемент маршрута
      const routeBtn = myMap.controls.get('routeButtonControl');
      routeBtn.routePanel.state.set('to', 'ул. Большая Конюшенная, 19/8, Санкт-Петербург');
    };

    // загрузка карты после загрузки DOM
    ymaps.ready(init); // eslint-disable-line no-undef
  });
})();

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
    focusLock.off(modal); // eslint-disable-line no-undef
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
    focusLock.on(modal); // eslint-disable-line no-undef
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
