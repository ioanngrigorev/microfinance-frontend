# API Specification для Backend

## Обзор
API для управления заявками на займы в системе Human Fintech. Уникальный идентификатор клиента - номер телефона.

## Base URL
```
http://localhost:8080/api
```

## Endpoints

### 1. Создание заявки
**POST** `/applications`

**Request Body:**
```json
{
  "phoneNumber": "+7 (999) 123-45-67",
  "amount": 1000,
  "term": 3,
  "selectedProduct": {
    "name": "Экспресс",
    "description": "Быстрое одобрение",
    "amount": 1000,
    "term": 3
  },
  "walletAddress": null,
  "status": "PENDING_VERIFICATION",
  "createdAt": "2025-01-16T10:30:00Z"
}
```

**Response:**
```json
{
  "phoneNumber": "+7 (999) 123-45-67",
  "amount": 1000,
  "term": 3,
  "selectedProduct": {
    "name": "Экспресс",
    "description": "Быстрое одобрение",
    "amount": 1000,
    "term": 3
  },
  "walletAddress": null,
  "status": "PENDING_VERIFICATION",
  "createdAt": "2025-01-16T10:30:00Z",
  "updatedAt": "2025-01-16T10:30:00Z",
  "adminNotes": ""
}
```

### 2. Получение заявки по номеру телефона
**GET** `/applications/phone/{phoneNumber}`

**Response (200):**
```json
{
  "phoneNumber": "+7 (999) 123-45-67",
  "amount": 1000,
  "term": 3,
  "selectedProduct": {
    "name": "Экспресс",
    "description": "Быстрое одобрение",
    "amount": 1000,
    "term": 3
  },
  "walletAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  "status": "APPROVED",
  "createdAt": "2025-01-16T10:30:00Z",
  "updatedAt": "2025-01-16T11:45:00Z",
  "adminNotes": "Заявка одобрена после проверки документов"
}
```

**Response (404):**
```json
{
  "error": "Application not found",
  "message": "No application found for phone number +7 (999) 123-45-67"
}
```

### 3. Получение всех заявок (для админ панели)
**GET** `/applications`

**Query Parameters:**
- `status` (optional): фильтр по статусу (`PENDING_VERIFICATION`, `APPROVED`, `REJECTED`, `DISBURSED`)
- `limit` (optional): количество записей (по умолчанию 50)
- `offset` (optional): смещение (по умолчанию 0)

**Response:**
```json
[
  {
    "phoneNumber": "+7 (999) 123-45-67",
    "amount": 1000,
    "term": 3,
    "selectedProduct": {
      "name": "Экспресс",
      "description": "Быстрое одобрение",
      "amount": 1000,
      "term": 3
    },
    "walletAddress": null,
    "status": "PENDING_VERIFICATION",
    "createdAt": "2025-01-16T10:30:00Z",
    "updatedAt": "2025-01-16T10:30:00Z",
    "adminNotes": ""
  }
]
```

### 4. Обновление статуса заявки
**PUT** `/applications/{phoneNumber}/status`

**Request Body:**
```json
{
  "status": "APPROVED",
  "adminNotes": "Заявка одобрена после проверки документов",
  "updatedAt": "2025-01-16T11:45:00Z"
}
```

**Response:**
```json
{
  "phoneNumber": "+7 (999) 123-45-67",
  "amount": 1000,
  "term": 3,
  "selectedProduct": {
    "name": "Экспресс",
    "description": "Быстрое одобрение",
    "amount": 1000,
    "term": 3
  },
  "walletAddress": null,
  "status": "APPROVED",
  "createdAt": "2025-01-16T10:30:00Z",
  "updatedAt": "2025-01-16T11:45:00Z",
  "adminNotes": "Заявка одобрена после проверки документов"
}
```

### 5. Получение статистики заявок
**GET** `/applications/stats`

**Response:**
```json
{
  "total": 150,
  "pending": 25,
  "approved": 80,
  "rejected": 30,
  "disbursed": 15,
  "totalAmount": 150000,
  "averageAmount": 1000,
  "conversionRate": 0.63
}
```

## Статусы заявок

| Статус | Описание |
|--------|----------|
| `PENDING_VERIFICATION` | Ожидает верификации администратором |
| `APPROVED` | Одобрена, клиент может подключить кошелек |
| `REJECTED` | Отклонена |
| `DISBURSED` | Средства выданы на кошелек клиента |

## Коды ошибок

| Код | Описание |
|-----|----------|
| 400 | Неверные данные запроса |
| 404 | Заявка не найдена |
| 409 | Заявка с таким номером телефона уже существует |
| 500 | Внутренняя ошибка сервера |

## Примеры использования

### Создание заявки
```javascript
const response = await fetch('/api/applications', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phoneNumber: '+7 (999) 123-45-67',
    amount: 1000,
    term: 3,
    selectedProduct: {
      name: 'Экспресс',
      description: 'Быстрое одобрение',
      amount: 1000,
      term: 3
    }
  })
})
```

### Проверка статуса заявки
```javascript
const response = await fetch('/api/applications/phone/%2B7%20(999)%20123-45-67')
const application = await response.json()
console.log('Статус:', application.status)
```

### Одобрение заявки (админ)
```javascript
const response = await fetch('/api/applications/%2B7%20(999)%20123-45-67/status', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    status: 'APPROVED',
    adminNotes: 'Заявка одобрена'
  })
})
```

## База данных

### Таблица: applications
```sql
CREATE TABLE applications (
  phone_number VARCHAR(20) PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  term INTEGER NOT NULL,
  selected_product JSON,
  wallet_address VARCHAR(42),
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING_VERIFICATION',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  admin_notes TEXT
);
```

### Индексы
```sql
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at);
CREATE INDEX idx_applications_wallet_address ON applications(wallet_address);
```

## Безопасность

1. **Валидация данных**: Все входящие данные должны быть валидированы
2. **Rate Limiting**: Ограничение количества запросов с одного IP
3. **CORS**: Настройка CORS для фронтенда
4. **Логирование**: Логирование всех операций с заявками
5. **Аутентификация**: Для админ операций требуется аутентификация

## Мониторинг

1. **Метрики**: Количество заявок, время обработки, конверсия
2. **Алерты**: Уведомления о критических ошибках
3. **Логи**: Структурированные логи для анализа
