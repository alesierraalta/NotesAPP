// src/components/common/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface SidebarProps {
  notes: Note[];
}

interface Note {
  id: string;
  title: string;
}

const SidebarContainer = styled.div`
  width: 280px;
  padding: 24px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 24px;
  color: #007bff;
  font-weight: 700;
`;

const CreateNoteLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const NotesHeader = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 16px;
  color: #495057;
  font-weight: 600;
`;

const NotesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
`;

const NoteItem = styled.li<{ isActive: boolean }>`
  margin-bottom: 8px;

  a {
    text-decoration: none;
    color: ${props => props.isActive ? 'white' : '#343a40'};
    padding: 10px 12px;
    display: block;
    border-radius: 4px;
    transition: all 0.3s ease;
    background-color: ${props => props.isActive ? '#007bff' : 'transparent'};
    font-weight: ${props => props.isActive ? '600' : 'normal'};

    &:hover {
      background-color: ${props => props.isActive ? '#0056b3' : '#e9ecef'};
    }
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ notes }) => {
  const location = useLocation();

  return (
    <SidebarContainer aria-label="Sidebar Navigation">
      <SidebarHeader>NoteApp</SidebarHeader>
      <CreateNoteLink to="/new">Create New Note</CreateNoteLink>
      <NotesHeader>Your Notes</NotesHeader>
      <NotesList>
        {notes.map(note => (
          <NoteItem 
            key={note.id} 
            isActive={location.pathname === `/notes/${note.id}`}
          >
            <Link 
              to={`/notes/${note.id}`} 
              aria-current={location.pathname === `/notes/${note.id}` ? 'page' : undefined}
            >
              {note.title}
            </Link>
          </NoteItem>
        ))}
      </NotesList>
    </SidebarContainer>
  );
};

export default Sidebar;