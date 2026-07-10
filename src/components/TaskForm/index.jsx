import { useState } from 'react';

const TaskForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (!title.trim()) {
      alert('Введите заголовок задачи');
      return;
    }

    onCreate({ title, description });
    setTitle('');
    setDescription('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Название задачи"
      />
      <br />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Описание"
      />
      <br />
      <button onClick={handleAdd}>Добавить</button>
    </div>
  );
};

export default TaskForm;
