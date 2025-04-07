# services

Сервисы для служебных и личных нужд.

## Для получения файлов без ограничения по CORS

- Получение изображения как есть:
  `/public/proxy?url=https://aromachef.ru/pictures/recipe/1-ingredients@1x.webp`.
- Получение принудительно JPEG из WEBP - для этого указываем степень сжатия:
  `/public/proxy?url=https://aromachef.ru/pictures/recipe/1-ingredients@1x.webp&quality=70`.
- Получение DOCX из HTML-строки: `/public/docx` (POST).
