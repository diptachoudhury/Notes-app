import { Note } from '../pages/NotesPage';
import { useState } from 'react';

interface NoteListProps {
  notes: Note[];
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

const NoteList = ({ notes, onUpdate, onDelete }: NoteListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleEditClick = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSave = (id: string) => {
    onUpdate(id, editContent);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet. Add your first note above!</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded-md shadow">
            {editingId === note.id ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(note.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="whitespace-pre-wrap">{note.content}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(note)}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(note.id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;