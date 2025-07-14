import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const API_BASE_URL = 'https://notes-app-r5ah.onrender.com/api/notes';

export const useNotesApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllNotes = async () => {
    const token = await getAccessTokenSilently();
    const response = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  const createNote = async (content: string) => {
    const token = await getAccessTokenSilently();
    const response = await axios.post(
      API_BASE_URL,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  };

  const updateNote = async (id: string, content: string) => {
    const token = await getAccessTokenSilently();
    const response = await axios.put(
      `${API_BASE_URL}/${id}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  };

  const deleteNote = async (id: string) => {
    const token = await getAccessTokenSilently();
    await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const searchNotes = async (query: string) => {
    const token = await getAccessTokenSilently();
    const response = await axios.get(`${API_BASE_URL}/search?q=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  return {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    searchNotes
  };
};