# ToDo RTK — Клиентское приложение для управления задачами

Фронтенд на **React 19** + **Redux Toolkit** + **React Router** для работы с REST API бэкенда (проект `node`).

## Стек

- **React 19** + **React DOM 19**
- **Redux Toolkit** (RTK) + **react-redux**
- **React Router** (v8) + **react-router-dom** (v7)
- **Vite 8** — сборка и dev-сервер
- **oxlint** — линтер

## Структура проекта

```
ToDo_RTK/
├── src/
│   ├── api/
│   │   ├── authApi.js        # API-клиент для регистрации/логина
│   │   └── tasksApi.js       # API-клиент для CRUD задач
│   ├── RTK/
│   │   ├── store.js          # Конфигурация Redux-стора
│   │   └── slices/
│   │       ├── authSlice.js  # Слайс авторизации (async thunks)
│   │       └── tasksSliсe.js # Слайс задач (async thunks)
│   ├── components/
│   │   ├── Logout/           # Компонент выхода из системы
│   │   ├── PrivateRoute/     # Защищённый маршрут (требует авторизацию)
│   │   ├── TaskFilter/       # Фильтрация задач
│   │   ├── TaskForm/         # Форма создания/редактирования задачи
│   │   ├── TaskItem/         # Карточка одной задачи
│   │   └── TaskList/         # Список задач
│   ├── pages/
│   │   ├── auth/             # Страница авторизации (логин/регистрация)
│   │   ├── todos/            # Страница списка задач
│   │   └── notFound/         # Страница 404
│   ├── helpers/
│   │   └── token.js          # Утилита для хранения JWT-токена
│   ├── App.jsx               # Роутинг приложения
│   ├── App.css
│   ├── main.jsx              # Точка входа (Provider + BrowserRouter)
│   └── index.css
├── .env                      # Переменные окружения
├── .env.example              # Шаблон переменных
├── vite.config.js
├── index.html
└── package.json
```

## Установка и запуск

```bash
npm install
npm run dev       # Vite dev-сервер
npm run build     # Продакшн-сборка
npm run preview   # Превью продакшн-сборки
npm run lint      # oxlint
```

## Переменные окружения

| Переменная  | Описание                    | Пример                         |
|-------------|-----------------------------|--------------------------------|
| `VITE_URL`  | URL бэкенд-API              | `http://localhost:5001/api`    |

`.env.example`:
```
VITE_URL= https://*
```

## Маршруты

| Путь       | Компонент      | Доступ          |
|------------|----------------|-----------------|
| `/`        | → редирект на `/auth` | —         |
| `/auth`    | `Auth`         | Публичный       |
| `/todos`   | `Todos`        | Только авторизованные |
| `*`        | `NotFound`     | —               |

## Redux Store

```js
{
  auth: {
    user: null,       // { access_token, user: { id, name, email } }
    errors: null,
    isLoading: false
  },
  todo: {
    items: [],        // Массив задач
    loading: false,
    error: null
  }
}
```

### Auth Slice

| Thunk / Action | Описание                              |
|----------------|---------------------------------------|
| `authUser`     | Регистрация или логин (async thunk)   |
| `logoutUser`   | Очистка стейта + удаление токена      |

### Tasks Slice

| Thunk          | Описание                              |
|----------------|---------------------------------------|
| `getTask`      | Загрузка списка задач                 |
| `createTask`   | Создание новой задачи                 |
| `deleteTask`   | Удаление задачи                       |
| `toggleTask`   | Переключение статуса completed        |
| `updateTask`   | Частичное обновление задачи           |

## API-клиент

Все запросы к бэкенду ходят через модули `src/api/`:

- **authApi.js** — `authUserApi(userData)` — автоматически определяет `register` или `login` по наличию поля `name`, сохраняет токен через `token.set()`
- **tasksApi.js** — CRUD-операции с автоматически подставляемым `Authorization: Bearer` заголовком

Токен хранится через утилиту `src/helpers/token.js` (обёртка над `localStorage`).

## Связь с бэкендом

Фронтенд ожидает REST API по адресу из `VITE_URL`, соответствующий проекту [`../node`](../node). Запустите бэкенд перед работой:

```bash
cd ../node
npm install
npm run dev
```
