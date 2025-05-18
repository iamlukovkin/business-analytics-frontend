# Business analytics

Geo Bee React — это современное React-приложение для анализа геопространственных данных с помощью интерактивных карт и визуализации.  
Проект предоставляет удобный интерфейс для просмотра продуктов с геоданными, отображения слоев и принятия решений на основе карт.

![](./images/example.png)

---

## Возможности

- Отображение списка продуктов с подробным описанием и слоями геоданных
- Интерактивные карты с поддержкой MapLibre и Mapbox GL
- Использование H3, Turf и GeoJSON для обработки геопространственной информации
- Маршрутизация с помощью React Router
- Адаптивный и удобный UI с React и CSS

---

## Технологии

- React 19
- React Router DOM 7
- Mapbox GL / MapLibre GL
- Turf.js — геопространственный анализ
- H3-js — система гексагональных индексов
- GeoJSON — формат геоданных
- dotenv — работа с переменными окружения

---

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/yourusername/geo-bee-react.git
   cd geo-bee-react
    ```
   
2. Установите зависимости:

   ```bash
   npm install
   ```

3. Создайте `.env` файл в корне и добавьте необходимые переменные окружения, например:

    ```dotenv
    REACT_APP_MAP_API_TOKEN=<token>
    REACT_APP_BACKEND_URL=http://localhost:8080
    REACT_APP_MAP_DEFAULT_LATITUDE=55.751244
    REACT_APP_MAP_DEFAULT_LONGITUDE=37.618423
    REACT_APP_MAP_DEFAULT_ZOOM=12
    ```

## Запуск

Для запуска в режиме разработки:

```bash
npm start
```

Приложение будет доступно по адресу http://localhost:3000.

## Структура проекта

- `src/components` — React-компоненты (Header, HomePage, ProductsPage и т.д.)
- `src/static/js` — вспомогательные скрипты и HTTP-клиент
- `src/styles` — стили CSS
- `public` — публичные ресурсы