import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import NoteDetail from '../components/notes/NoteDetail';
import Sidebar from '../components/common/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const HomePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from('notes').select('*');
    if (error) {
      console.error('Error fetching notes:', error);
    } else {
      setNotes(data || []);
    }
  };

  const handleNoteDeleted = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleNoteAdded = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar notes={notes} />
        <div className="app-content">
          <Routes>
            <Route
              path="/notes/:id"
              element={<NoteDetail onNoteDeleted={handleNoteDeleted} />}
            />
            <Route
              path="/new"
              element={<CreateNotePage onNoteAdded={handleNoteAdded} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default HomePage;
