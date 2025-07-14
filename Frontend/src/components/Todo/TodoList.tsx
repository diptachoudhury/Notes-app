// src/components/Todo/TodoList.tsx
import React, { useEffect, useState, useCallback } from 'react';
import useTodos from '../../hooks/useTodos';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, loading, error, getTodos, createTodo, updateTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Memoize the getTodos function to prevent unnecessary recreations
  const fetchTodos = useCallback(async () => {
    await getTodos();
  }, [getTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // Only re-run when fetchTodos changes

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (loading) return <div className="flex justify-center items-center h-20">Loading todos...</div>;
  if (error) return <div className="text-red-500 p-4 bg-white rounded-lg m-4 text-center">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">My Notes</h2>
      
      <TodoForm onSubmit={createTodo} />
      
      <div className="flex gap-2 my-4">
        <button 
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      <ul className="mt-6">
        {filteredTodos.length === 0 ? (
          <li className="text-center p-4 text-gray-500">No todos found</li>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem 
              key={todo._id} 
              todo={todo} 
              onUpdate={updateTodo} 
              onDelete={deleteTodo} 
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;