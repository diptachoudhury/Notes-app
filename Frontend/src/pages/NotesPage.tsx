import { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../components/Login';

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated, isLoading } = useAuth0();
  
  // Simulate loading notes from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
  };

  const handleUpdateNote = (id: string, newContent: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Notes</h1>
     {isAuthenticated ? <>
       <NoteForm onSubmit={handleAddNote} />
      <NoteList
        notes={notes}
        onUpdate={handleUpdateNote}
        onDelete={handleDeleteNote}
      />

     </> : 
     <> 
     <LoginButton/>
    
     </>}
     
     
    </div>
  );
};

export default NotesPage;