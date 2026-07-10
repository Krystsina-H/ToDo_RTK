import { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || '',
  );

  const isCompleted = task.completed === true;

  const startEditing = () => {
    setIsEditing(true);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleUpdateTask = () => {
    if (!editTitle.trim()) {
      alert('Заголовок задачи не может быть пустым');
      return;
    }

    onUpdate(task.id || task._id, editTitle, editDescription);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Удалить задачу "${task.title}"?`)) {
      onDelete(task.id || task._id);
    }
  };

  return (
    <li key={task.id || task._id}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Название задачи"
          />
          <br />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Описание"
          />
          <br />
          <button onClick={handleUpdateTask}>Сохранить</button>
          <button onClick={cancelEditing}>Отмена</button>
        </div>
      ) : (
        <>
          <div onDoubleClick={startEditing}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggle(task.id || task._id)}
            />
            <h3
              style={{
                textDecoration: isCompleted ? 'line-through' : 'none',
                opacity: isCompleted ? 0.6 : 1,
                display: 'inline-block',
                marginLeft: '10px',
              }}
            >
              {task.title}
            </h3>
            <p>{task.description}</p>
          </div>
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            <button onClick={startEditing}> Редактировать</button>
            <button onClick={handleDeleteClick}>Удалить</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
