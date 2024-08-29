import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import styled from 'styled-components';

interface Note {
  id: string;
  title: string;
  body: string;
}

const NotesListContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #007bff;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0;
`;

const CreateNoteButton = styled(Link)`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoteItem = styled(Link)`
  display: block;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const NoteTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #007bff;
`;

const NoteExcerpt = styled.p`
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0;
`;

const NoNotes = styled.p`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  margin-top: 2rem;
`;

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching notes:', error.message);
    } else {
      setNotes(data || []);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesListContainer>
      <NotesHeader>
        <Title>Your Notes</Title>
        <CreateNoteButton to="/new">Create New Note</CreateNoteButton>
      </NotesHeader>
      {notes.length === 0 ? (
        <NoNotes>You don't have any notes yet. Create one to get started!</NoNotes>
      ) : (
        notes.map(note => (
          <NoteItem to={`/notes/${note.id}`} key={note.id}>
            <NoteTitle>{note.title}</NoteTitle>
            <NoteExcerpt>
              {note.body.length > 100 ? `${note.body.substring(0, 100)}...` : note.body}
            </NoteExcerpt>
          </NoteItem>
        ))
      )}
    </NotesListContainer>
  );
};

export default NotesList;