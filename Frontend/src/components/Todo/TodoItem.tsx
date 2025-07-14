// src/components/Todo/TodoItem.tsx
import React, { useState } from 'react';
import './TodoItem.css';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: { title?: string; completed?: boolean }) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggle = () => {
    onUpdate(todo._id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo._id, { title: editTitle });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(todo.title);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="todo-edit-input"
          />
        ) : (
          <span 
            className="todo-text"
            onDoubleClick={handleEdit}
          >
            {todo.title}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        {!isEditing && (
          <button 
            onClick={handleEdit}
            className="todo-action-button edit-button"
          >
            Edit
          </button>
        )}
        <button 
          onClick={() => onDelete(todo._id)}
          className="todo-action-button delete-button"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;