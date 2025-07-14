import { Schema, model, Document } from 'mongoose';

interface ITodo extends Document {
  title: string;
  completed: boolean;
  userId: string;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true, index: true }
}, { timestamps: true });

export default model<ITodo>('Todo', TodoSchema);