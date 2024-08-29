import React from 'react';
import { Link } from 'react-router-dom';

// Define the types for props
interface NoteItemProps {
  note: {
    id: string;
    title: string;
    body: string;
    status: string;
  };
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  return (
    <Link to={`/notes/${note.id}`} className="NoteItem">
      <h4>{note.title}</h4>
      <p>{note.body.length > 100 ? `${note.body.substring(0, 100)}...` : note.body}</p>
      <span className="status">{note.status}</span>
    </Link>
  );
};

export default NoteItem;
