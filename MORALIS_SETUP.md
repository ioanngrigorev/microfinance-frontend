# Настройка интеграции с Moralis

## 1. Создание аккаунта Moralis

1. Перейдите на [moralis.io](https://moralis.io)
2. Зарегистрируйтесь или войдите в аккаунт
3. Создайте новое приложение (Server)

## 2. Получение ключей API

1. В панели Moralis найдите ваше приложение
2. Скопируйте:
   - **Application ID** (App ID)
   - **Server URL**

## 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
# Moralis Configuration
REACT_APP_MORALIS_APP_ID=your_moralis_app_id_here
REACT_APP_MORALIS_SERVER_URL=your_moralis_server_url_here

# Network Configuration (Ethereum Mainnet)
REACT_APP_CHAIN_ID=0x1
REACT_APP_CHAIN_NAME=Ethereum Mainnet
REACT_APP_RPC_URL=https://mainnet.infura.io/v3/your_infura_key

# Stablecoin Contracts
REACT_APP_USDC_CONTRACT=0xA0b86a33E6441b8c4C8C0C4B8C4C8C0C4B8C4C8C
REACT_APP_USDT_CONTRACT=0xdAC17F958D2ee523a2206206994597C13D831ec7

# Your wallet for disbursing loans
REACT_APP_DISBURSEMENT_WALLET=your_wallet_address_here
```

## 4. Настройка Infura (опционально)

1. Зарегистрируйтесь на [infura.io](https://infura.io)
2. Создайте новый проект
3. Скопируйте Project ID
4. Замените `your_infura_key` в `.env.local`

## 5. Настройка кошелька для выдачи займов

1. Создайте новый Ethereum кошелек (например, в MetaMask)
2. Пополните его ETH для оплаты комиссий за транзакции
3. Пополните USDC/USDT для выдачи займов
4. Укажите адрес кошелька в `REACT_APP_DISBURSEMENT_WALLET`

## 6. Контракты стейблкоинов

### USDC (USD Coin)
- **Mainnet:** `0xA0b86a33E6441b8c4C8C0C4B8C4C8C0C4B8C4C8C`
- **Decimals:** 6
- **Symbol:** USDC

### USDT (Tether USD)
- **Mainnet:** `0xdAC17F958D2ee523a2206206994597C13D831ec7`
- **Decimals:** 6
- **Symbol:** USDT

## 7. Функциональность

### Создание кошелька
- Пользователи могут создать новый кошелек через Moralis
- Автоматическая генерация приватного ключа
- Сохранение в Moralis Cloud

### Подключение существующего кошелька
- Поддержка MetaMask, WalletConnect и других
- Автоматическое определение сети
- Проверка баланса стейблкоинов

### Выдача займов
- Перевод USDC/USDT на кошелек клиента
- Автоматический расчет комиссий
- Отслеживание транзакций в Etherscan

### Отображение баланса
- Реальное время обновления баланса
- Поддержка USDC и USDT
- Конвертация в USD

## 8. Безопасность

⚠️ **Важные моменты:**

1. **Никогда не публикуйте приватные ключи**
2. **Используйте переменные окружения для конфиденциальных данных**
3. **Проверяйте адреса контрактов перед использованием**
4. **Тестируйте на тестовых сетях перед mainnet**

## 9. Тестирование

### Testnet (Goerli)
```env
REACT_APP_CHAIN_ID=0x5
REACT_APP_CHAIN_NAME=Goerli Testnet
REACT_APP_RPC_URL=https://goerli.infura.io/v3/your_infura_key
```

### Получение тестовых токенов
- **Goerli ETH:** [goerlifaucet.com](https://goerlifaucet.com)
- **Goerli USDC:** [faucet.paradigm.xyz](https://faucet.paradigm.xyz)

## 10. Развертывание

1. Убедитесь, что все переменные окружения настроены
2. Проверьте баланс кошелька для выдачи займов
3. Протестируйте на тестовой сети
4. Разверните на production

## Поддержка

При возникновении проблем:
1. Проверьте консоль браузера на ошибки
2. Убедитесь в правильности API ключей
3. Проверьте баланс кошелька
4. Обратитесь к документации Moralis
