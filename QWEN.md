# Project: ToDo_RTK — React-клиент для ToDo API

## Запуск

- `npm run dev` — Vite dev-сервер
- `npm run build` — продакшн-сборка
- `npm run lint` — oxlint
- `npm run preview` — превью сборки

## Env

Требуется `.env` с переменной `VITE_URL` (URL бэкенд-API, например `http://localhost:5001/api`)

## Структура

- `src/api/` — fetch-клиенты для бэкенда (authApi, tasksApi)
- `src/RTK/store.js` — configureStore с редьюсерами auth и todo
- `src/RTK/slices/authSlice.js` — createAsyncThunk для авторизации
- `src/RTK/slices/tasksSliсe.js` — createAsyncThunk для CRUD задач (обрати внимание на опечатку в имени файла — Sli**с**e)
- `src/helpers/token.js` — обёртка над localStorage для JWT
- `src/components/` — UI-компоненты (PrivateRoute, TaskForm, TaskItem, TaskList, TaskFilter, Logout)
- `src/pages/` — страницы (auth, todos, notFound)

## Конвенции

- ESM (`import`/`export`), Vite
- React 19 + Redux Toolkit + React Router
- Все API-запросы через `src/api/` — не вызывать fetch напрямую в компонентах
- Токен хранится в localStorage через `src/helpers/token.js`
- `authApi.js` определяет register/login по наличию поля `name` в данных
- Защищённые маршруты обёрнуты в `<PrivateRoute />`
- Фронтенд связан с бэкендом из `../node` — запускай бэкенд перед разработкой

## Известные проблемы

- Имя файла `tasksSliсe.js` — кириллическая «с» (U+0441) вместо латинской «c» — может вызвать путаницу при импортах
- В `App.jsx` компонент `NotFount` (опечатка, должно быть `NotFound`)
- В `authSlice` стейт содержит `errors`, но селектор в странице Auth обращается к `error` — возможный баг
- `TaskItem` обрабатывает и `task.id`, и `task._id` (MongoDB-стиль) для совместимости
