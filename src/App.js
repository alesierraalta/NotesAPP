import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useQuery } from 'react-query';
import Sidebar from './components/common/Sidebar';
import NotesList from './components/notes/NotesList';
import NoteDetail from './components/notes/NoteDetail';
import CreateNotePage from './components/notes/CreateNotePage';
import { supabase } from './services/supabaseClient';
import './styles/App.css';

const fetchNotes = async () => {
  const { data, error } = await supabase.from('notes').select('id, title');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

function App() {


  // Fetch notes using React Query
  const { data: notes, isLoading, isError } = useQuery('notes', fetchNotes);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching notes</div>;

  return (
    <Router>
      <div className="App">
        <Sidebar notes={notes} />
        <div className="MainContent">
          <Routes>
            <Route path="/" element={<NotesList />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="/new" element={<CreateNotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
