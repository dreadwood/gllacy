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
