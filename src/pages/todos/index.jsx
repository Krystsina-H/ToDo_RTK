// src/pages/todos/index.jsx
import { useDispatch, useSelector } from 'react-redux';
import {
  getTask,
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
} from '../../RTK/slices/tasksSliсe';
import Logout from '../../components/Logout';
import TaskForm from '../../components/TaskForm';
import TaskFilter from '../../components/TaskFilter';
import TaskList from '../../components/TaskList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const Todos = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((store) => store.todo);
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || 'all');

  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);

  const handleCreate = (taskData) => {
    dispatch(createTask(taskData));
  };

  const handleToggle = (taskId) => {
    dispatch(toggleTask(taskId));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleUpdate = (taskId, title, description) => {
    dispatch(
      updateTask({
        taskId,
        updatedData: { title, description },
      }),
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  if (loading) {
    return (
      <>
        <Logout />
        <h1>Загрузка задач...</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Logout />
        <h1>Ошибка: {JSON.stringify(error)}</h1>
        <button onClick={() => dispatch(getTask())}>Повторить</button>
      </>
    );
  }

  return (
    <>
      <Logout />
      <h1>Список задач</h1>

      <TaskForm onCreate={handleCreate} />

      <TaskFilter onFilterChange={handleFilterChange} />

      <TaskList
        filter={filter}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default Todos;
