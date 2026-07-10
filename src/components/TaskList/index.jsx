import { useSelector } from 'react-redux';
import TaskItem from '../TaskItem';

const TaskList = ({ filter, onToggle, onDelete, onUpdate }) => {
  const { items } = useSelector((store) => store.todo);

  if (!items) {
    return <p>Загрузка задач...</p>;
  }

  const getFilteredItems = () => {
    switch (filter) {
      case 'completed':
        return items.filter((task) => task.completed === true);
      case 'active':
        return items.filter((task) => task.completed === false);
      default:
        return items;
    }
  };

  const filteredItems = getFilteredItems();

  if (filteredItems.length === 0) {
    return (
      <p>
        {filter === 'all'
          ? 'Нет задач'
          : filter === 'active'
            ? 'Нет активных задач'
            : 'Нет выполненных задач'}
      </p>
    );
  }

  return (
    <ul>
      {filteredItems.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default TaskList;
