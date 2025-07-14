import { Request, Response, NextFunction } from 'express';
import Todo from '../models/Todo';

 interface JwtPayload {
  userId: string;
  domain: string;
}
declare global {
  namespace Express {
    interface Request {
      userId?: JwtPayload; 
    }
  }
}

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const todo = new Todo({ title, userId: req.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
try {
 const { id } = req.params;
 const { title, completed } = req.body;
 
 const todo = await Todo.findOneAndUpdate(
{ _id: id, userId: req.userId },
{ title, completed },
{ new: true }
 );

if (!todo) {
res.status(404).json({ message: 'Todo not found' });
 return;
}


 res.json(todo);
 } catch (err) {
 next(err);
 }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });

    if (!todo) {
       res.status(404).json({ message: 'Todo not found' });
     return;
    }

    res.json({ message: 'Todo deleted' });
  } catch (err) {
    next(err);
  }
};

