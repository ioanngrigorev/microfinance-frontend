# 🚂 Деплой фронтенда на Railway

## 📋 Пошаговая инструкция

### 1. Откройте Railway
Перейдите на: **https://railway.app**

### 2. Войдите в свой проект
- Найдите проект "human-fintech" или как вы его назвали
- Нажмите на него

### 3. Добавьте новый сервис
- Нажмите **"+ New"** в правом верхнем углу
- Выберите **"GitHub Repo"**
- Выберите ваш репозиторий

### 4. Настройте сервис для frontend

#### 4.1 Укажите Root Directory:
- В настройках сервиса найдите **"Root Directory"**
- Укажите: `frontend`

#### 4.2 Настройте Build:
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview -- --port $PORT --host 0.0.0.0`

Или Railway автоматически определит настройки из `railway.json` и `nixpacks.toml`

### 5. Добавьте переменные окружения (если нужно)
- Нажмите на сервис → **"Variables"**
- Добавьте `PORT=8080` (необязательно, Railway установит автоматически)

### 6. Generate Domain
- Перейдите в настройки сервиса
- Найдите раздел **"Settings"**
- Нажмите **"Generate Domain"**
- Railway создаст публичный URL типа: `https://microfinance-frontend.up.railway.app`

### 7. Deploy!
- Нажмите **"Deploy"** или Railway автоматически задеплоит после пуша в GitHub

---

## ✅ Проверка

После деплоя проверьте:
- URL открывается: `https://ваш-домен.up.railway.app`
- Главная страница загружается
- Навигация работает
- Калькулятор считает
- Форма отправляется

---

## 🔗 Связь с Backend

Убедитесь, что в `vite.config.js` указан правильный URL backend:

```javascript
proxy: {
  '/api': {
    target: 'https://human-fintech.railway.app', // ваш backend
    changeOrigin: true,
    secure: false,
  }
}
```

---

## 🎉 Готово!

Теперь у вас:
- ✅ Backend на Railway: `https://human-fintech.railway.app`
- ✅ Frontend на Railway: `https://ваш-frontend.up.railway.app`

---

## 🆘 Возможные проблемы

### Проблема: "Application failed to respond"
**Решение:**
1. Проверьте, что `railway.json` и `nixpacks.toml` правильно настроены
2. Убедитесь, что `npm run build` выполняется без ошибок
3. Проверьте логи деплоя

### Проблема: "Build failed"
**Решение:**
1. Проверьте `package.json` - все ли зависимости указаны
2. Убедитесь, что Root Directory = `frontend`
3. Проверьте логи сборки

### Проблема: Страница не открывается
**Решение:**
1. Убедитесь, что вы сгенерировали публичный домен
2. Проверьте, что Start Command указан правильно
3. Проверьте логи Runtime

---

## 📞 Если нужна помощь

1. Проверьте **Deployments** → **View Logs**
2. Посмотрите ошибки в логах
3. Исправьте и запушьте в GitHub - Railway пересоберет автоматически

---

## 🚀 Автоматический деплой

После первой настройки:
- Каждый `git push` в GitHub автоматически деплоит обновления на Railway
- Никаких дополнительных действий не требуется!

---

**Удачи! 🎉**


