# 🚀 Деплой фронтенда

## Вариант 1: Vercel (Рекомендуется) ⚡

### Шаги:

1. **Перейдите на [vercel.com](https://vercel.com)**

2. **Нажмите "Sign Up" и войдите через GitHub**

3. **Нажмите "New Project"**

4. **Импортируйте репозиторий:**
   - Выберите ваш GitHub репозиторий
   - Или нажмите "Import Git Repository"

5. **Настройте проект:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. **Нажмите "Deploy"**

7. **Готово! 🎉**
   - Vercel автоматически создаст URL: `https://your-project.vercel.app`
   - При каждом push в GitHub будет автоматический деплой

---

## Вариант 2: Netlify 🌐

### Шаги:

1. **Перейдите на [netlify.com](https://netlify.com)**

2. **Нажмите "Sign Up" и войдите через GitHub**

3. **Нажмите "Add new site" → "Import an existing project"**

4. **Выберите GitHub и выберите ваш репозиторий**

5. **Настройте проект:**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

6. **Нажмите "Deploy site"**

7. **Готово! 🎉**
   - Netlify создаст URL: `https://your-project.netlify.app`

---

## Вариант 3: Railway 🚂

### Шаги:

1. **Перейдите на [railway.app](https://railway.app)**

2. **Войдите через GitHub**

3. **Нажмите "New Project" → "Deploy from GitHub repo"**

4. **Выберите ваш репозиторий**

5. **Добавьте сервис:**
   - Выберите папку `frontend`

6. **Настройте:**
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview`

7. **Добавьте переменные окружения (если нужно)**

8. **Нажмите "Deploy"**

---

## Локальный деплой (для тестирования) 💻

### 1. Соберите проект:
```bash
cd frontend
npm run build
```

### 2. Запустите preview:
```bash
npm run preview
```

### 3. Откройте в браузере:
```
http://localhost:4173
```

---

## 🔧 Настройка API для продакшена

После деплоя фронтенда, обновите `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://human-fintech.railway.app', // ваш backend URL
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

---

## 📱 Проверка

После деплоя проверьте:
- ✅ Главная страница загружается
- ✅ Навигация работает
- ✅ Калькулятор считает правильно
- ✅ Форма отправляется
- ✅ API запросы работают

---

## 🎉 Готово!

Ваш фронтенд задеплоен и работает! 🚀

URL примеры:
- **Vercel**: `https://microfinance-frontend.vercel.app`
- **Netlify**: `https://microfinance-frontend.netlify.app`
- **Railway**: `https://microfinance-frontend.up.railway.app`


