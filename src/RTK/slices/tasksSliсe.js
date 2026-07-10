import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchTasks,
  createTaskApi,
  deleteTaskApi,
  toggleTaskApi,
  updateTaskApi,
} from '../../api/tasksApi';

export const getTask = createAsyncThunk('todo/getTask', async (_, thunkAPI) => {
  try {
    const data = await fetchTasks();
    console.log('Задачи загружены:', data);
    return data;
  } catch (error) {
    console.error('Ошибка загрузки задач:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createTask = createAsyncThunk(
  'todo/createTask',
  async (body, thunkAPI) => {
    try {
      const data = await createTaskApi(body);
      console.log('Задача создана:', data);
      return data;
    } catch (error) {
      console.error('Ошибка создания задачи:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteTask = createAsyncThunk(
  'todo/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      await deleteTaskApi(taskId);
      console.log('Задача удалена:', taskId);
      return taskId;
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const toggleTask = createAsyncThunk(
  'todo/toggleTask',
  async (taskId, thunkAPI) => {
    try {
      const data = await toggleTaskApi(taskId);
      console.log('Статус задачи переключен:', data);
      return data;
    } catch (error) {
      console.error('Ошибка переключения статуса:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateTask = createAsyncThunk(
  'todo/updateTask',
  async ({ taskId, updatedData }, thunkAPI) => {
    try {
      const data = await updateTaskApi(taskId, updatedData);
      console.log(' Задача обновлена:', data);
      return data;
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const tasksSlice = createSlice({
  name: 'todo',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTask.fulfilled, (state, action) => {
        state.items = action.payload.data;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const newTask = action.payload;
        if (newTask) {
          state.items = [newTask, ...state.items];
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
        console.log('Задача удалена из списка');
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const taskIndex = state.items.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (taskIndex !== -1) {
          state.items[taskIndex] = action.payload;
          console.log('Статус задачи обновлен в списке');
        } else {
          console.warn('Задача для обновления не найдена в списке');
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const taskIndex = state.items.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (taskIndex !== -1) {
          state.items[taskIndex] = action.payload;
          console.log('Задача обновлена в списке');
        } else {
          console.warn('Задача для обновления не найдена в списке');
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Произошла ошибка';
        },
      );
  },
});

export default tasksSlice.reducer;
