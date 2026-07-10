import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

const TaskFilter = ({ onFilterChange }) => {
  const { items } = useSelector((store) => store.todo);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  if (!items) {
    return <div>Загрузка фильтров...</div>;
  }

  const completedCount = items.filter((task) => task.completed === true).length;
  const activeCount = items.filter((task) => task.completed === false).length;

  const handleFilterChange = (newFilter) => {
    setSearchParams({ filter: newFilter });
    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  return (
    <div>
      <button onClick={() => handleFilterChange('all')}>
        Все ({items.length})
      </button>
      <button onClick={() => handleFilterChange('active')}>
        Активные ({activeCount})
      </button>
      <button onClick={() => handleFilterChange('completed')}>
        Выполненные ({completedCount})
      </button>
    </div>
  );
};

export default TaskFilter;
