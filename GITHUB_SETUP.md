# 🐙 Создание GitHub репозитория для frontend

## 📋 Пошаговая инструкция

### 1. Создайте репозиторий на GitHub

1. **Откройте GitHub**: https://github.com
2. **Нажмите "+"** в правом верхнем углу
3. **Выберите "New repository"**
4. **Заполните:**
   - **Repository name**: `microfinance-frontend`
   - **Description**: `Frontend for microfinance application`
   - **Public** ✅
   - **НЕ добавляйте** README, .gitignore, license (у нас уже есть)
5. **Нажмите "Create repository"**

### 2. Подключите локальный репозиторий

После создания репозитория GitHub покажет команды. Выполните:

```bash
cd /Users/ivangrigorev/microfinance-frontend

# Добавьте remote (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/microfinance-frontend.git

# Запушьте код
git branch -M main
git push -u origin main
```

### 3. Проверьте

Откройте: `https://github.com/YOUR_USERNAME/microfinance-frontend`

Вы должны увидеть все файлы frontend!

---

## 🚂 Теперь деплой на Railway

### 1. Откройте Railway
https://railway.app

### 2. Создайте новый сервис
- **"+ New"** → **"GitHub Repo"**
- **Выберите**: `microfinance-frontend`

### 3. Railway автоматически определит настройки
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview -- --port $PORT --host 0.0.0.0`

### 4. Generate Domain
- **Settings** → **"Generate Domain"**

### 5. Deploy!
Railway автоматически задеплоит!

---

## 🎉 Готово!

Теперь у вас:
- ✅ **Backend**: `https://human-fintech.railway.app`
- ✅ **Frontend**: `https://ваш-frontend.up.railway.app`
- ✅ **GitHub**: отдельные репозитории

---

## 🔗 Ссылки

- **Backend GitHub**: `https://github.com/YOUR_USERNAME/microfinance-backend`
- **Frontend GitHub**: `https://github.com/YOUR_USERNAME/microfinance-frontend`
- **Backend Railway**: `https://human-fintech.railway.app`
- **Frontend Railway**: `https://ваш-frontend.up.railway.app`

---

**Следуйте инструкции выше! 🚀**
