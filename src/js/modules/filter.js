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
