'use strict';

(()=> {
  const banners = document.querySelectorAll('.banner');
  if (!banners.length) {
    return;
  }

  banners.forEach((banner) => {
    const container = banner.querySelector('.swiper-container');

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
      switch (swiperObj.activeIndex) {
        case 2:
          document.body.classList.remove('page-index--bg-brown');
          document.body.classList.add('page-index--bg-blue');
          break;
        case 3:
          document.body.classList.remove('page-index--bg-blue');
          document.body.classList.add('page-index--bg-brown');
          break;
        default:
          document.body.classList.remove('page-index--bg-blue');
          document.body.classList.remove('page-index--bg-brown');
      }
    });
  });
})();
