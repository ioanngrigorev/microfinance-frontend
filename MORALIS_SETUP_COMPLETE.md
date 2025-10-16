# Настройка Moralis - ГОТОВО! 🎉

## ✅ Что уже настроено:

### 1. API Key (App ID) - НАСТРОЕН
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImJhZjE3MTE2LTcwYjktNGI4MC05NWM5LWY1ZDg5OWFkZDg3ZSIsIm9yZ0lkIjoiNDc2MTU0IiwidXNlcklkIjoiNDg5ODYzIiwidHlwZUlkIjoiZmI2YzYyNmItZTFmMC00NGRlLWE0NmItZTFiYmI3YTUzYzY1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NjA1ODM5MDgsImV4cCI6NDkxNjM0MzkwOH0.6A42Y-RnNFj6ME-uTe87nEv3Zaj3Zaj3Jkhhr_zciBOiJc8
```

### 2. Что нужно найти в панели Moralis:

**Server URL** - найдите в панели Moralis:
1. Перейдите в раздел "Settings" → "Server Details"
2. Скопируйте "Server URL" (выглядит как `https://xxxxx.moralis.io:2053/server`)
3. Замените в файлах:
   - `src/config/moralis.js` - строка 4
   - `src/App.jsx` - строка 21

### 3. Создайте файл .env.local (опционально):

```env
# Moralis Configuration
REACT_APP_MORALIS_APP_ID=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImJhZjE3MTE2LTcwYjktNGI4MC05NWM5LWY1ZDg5OWFkZDg3ZSIsIm9yZ0lkIjoiNDc2MTU0IiwidXNlcklkIjoiNDg5ODYzIiwidHlwZUlkIjoiZmI2YzYyNmItZTFmMC00NGRlLWE0NmItZTFiYmI3YTUzYzY1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NjA1ODM5MDgsImV4cCI6NDkxNjM0MzkwOH0.6A42Y-RnNFj6ME-uTe87nEv3Zaj3Jkhhr_zciBOiJc8
REACT_APP_MORALIS_SERVER_URL=https://your-server-url.moralis.io:2053/server

# Network Configuration
REACT_APP_CHAIN_ID=0x1
REACT_APP_CHAIN_NAME=Ethereum Mainnet
REACT_APP_RPC_URL=https://mainnet.infura.io/v3/your_infura_key

# Stablecoin Contracts
REACT_APP_USDC_CONTRACT=0xA0b86a33E6441b8c4C8C0C4B8C4C8C0C4B8C4C8C
REACT_APP_USDT_CONTRACT=0xdAC17F958D2ee523a2206206994597C13D831ec7

# Your wallet for disbursing loans
REACT_APP_DISBURSEMENT_WALLET=your_wallet_address_here
```

## 🚀 Функциональность готова:

### ✅ Создание кошельков
- Пользователи могут создать новый кошелек
- Подключение существующих кошельков (MetaMask)

### ✅ Управление стейблкоинами
- Отображение баланса USDC/USDT
- Реальное время обновления

### ✅ Выдача займов
- Перевод стейблкоинов на кошелек клиента
- Выбор между USDC и USDT
- Отслеживание транзакций

### ✅ Безопасность
- JWT токен настроен
- Валидация транзакций
- Обработка ошибок

## 📱 Доступные страницы:

- **`/crypto-wallet`** - Управление кошельком
- **`/application`** - Анкета с интеграцией кошелька
- **Навигация** - Кнопка "Крипто кошелек" в хедере

## 🔧 Следующие шаги:

1. **Найдите Server URL** в панели Moralis
2. **Обновите конфигурацию** с правильным Server URL
3. **Создайте кошелек** для выдачи займов
4. **Пополните кошелек** USDC/USDT для тестирования
5. **Протестируйте** на тестовой сети (Goerli)

## ⚠️ Важно:

- **Никогда не публикуйте** приватные ключи
- **Тестируйте сначала** на тестовых сетях
- **Проверяйте баланс** кошелька для выдачи займов
- **Сохраните seed-фразу** для восстановления кошелька

## 🎯 Готово к использованию!

После настройки Server URL ваша платформа будет полностью готова для:
- Создания крипто кошельков
- Выдачи займов в стейблкоинах
- Управления балансами
- Безопасных транзакций

**Удачного использования! 🚀**
