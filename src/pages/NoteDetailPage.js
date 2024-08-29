// src/pages/NoteDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

function NoteDetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  const fetchNote = async () => {
    const { data } = await supabase.from('notes').select('*').eq('id', id).single();
    setNote(data);
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  return (
    <div>
      {note ? (
        <>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => navigate('/')}>Back to Notes</button>
    </div>
  );
}

export default NoteDetailPage;
