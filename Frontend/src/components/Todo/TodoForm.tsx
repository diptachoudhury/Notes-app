// src/components/Todo/TodoForm.tsx
import React, { useState } from 'react';
import './TodoForm.css';

interface TodoFormProps {
  onSubmit: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title);
      setTitle('');
    }
  };

  return (
<form onSubmit={handleSubmit} className="todo-form">
  <textarea
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Add a new note..."
    className="todo-input"
    rows={4} // Optional: You can set the initial number of rows
  ></textarea>
  <button type="submit" className="todo-add-button">
    Add
  </button>
</form>
  );
};

export default TodoForm;