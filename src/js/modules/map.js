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
