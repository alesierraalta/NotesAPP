import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { supabase } from '../../services/supabaseClient';
import styled from 'styled-components';

const NoteDetailContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NoteInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: bold;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const NoteTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  font-size: 1rem;
  font-weight: 600;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SaveButton = styled(Button)`
  background-color: #007bff;
  color: white;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #a5c8ff;
    cursor: not-allowed;
  }
`;

const BackButton = styled(Link)`
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.1s ease;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background-color: #5a6268;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export default function CreateNotePage() {
  const [note, setNote] = useState({ title: '', body: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNote(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.title.trim() || !note.body.trim()) {
      alert('Please fill in both title and body');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ title: note.title, body: note.body }])
        .select();

      if (error) throw error;
      if (data && data.length > 0) {
        queryClient.invalidateQueries('notes');
        navigate(`/notes/${data[0].id}`);
      }
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NoteDetailContainer>
      <NoteInput
        type="text"
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Enter note title"
      />
      <NoteTextarea
        name="body"
        value={note.body}
        onChange={handleChange}
        placeholder="Write your note here..."
      />
      <ButtonGroup>
        <BackButton to="/">
          Back to Notes
        </BackButton>
        <SaveButton
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Note'}
        </SaveButton>
      </ButtonGroup>
    </NoteDetailContainer>
  );
}