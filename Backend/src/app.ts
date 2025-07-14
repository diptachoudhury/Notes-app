import express from 'express';
import cors from 'cors';
import { jwtCheck, extractUserId } from './middlewares/auth';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from './controllers/todos';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/todos', jwtCheck, extractUserId, getTodos);
app.post('/api/todos', jwtCheck, extractUserId, createTodo);
app.put('/api/todos/:id', jwtCheck, extractUserId, updateTodo);
app.delete('/api/todos/:id', jwtCheck, extractUserId, deleteTodo);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default app;