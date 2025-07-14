// src/hooks/useTodos.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://notes-app-r5ah.onrender.com/api/todos';

const useTodos = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getTodos = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [getAccessTokenSilently]);

  const createTodo = useCallback(async (title: string) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post(
        API_URL, 
        { title }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(prev => [...prev, response.data]);
    } catch (err) {
      setError(err as Error);
    }
  }, [getAccessTokenSilently]);

  const updateTodo = useCallback(async (id: string, updates: { title?: string; completed?: boolean }) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.put(
        `${API_URL}/${id}`,
        updates,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(prev => prev.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (err) {
      setError(err as Error);
    }
  }, [getAccessTokenSilently]);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      setError(err as Error);
    }
  }, [getAccessTokenSilently]);

  return { todos, loading, error, getTodos, createTodo, updateTodo, deleteTodo };
};

export default useTodos;