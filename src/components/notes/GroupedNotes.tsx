import React, { useState } from 'react';
import NoteItem from './NoteItem';

// Define the types for props
interface Note {
  id: string;
  title: string;
  body: string;
  status: string;
}

interface GroupedNotesProps {
  groupTitle: string;
  notes: Note[];
}

const GroupedNotes: React.FC<GroupedNotesProps> = ({ groupTitle, notes }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="GroupedNotes">
      <h3 onClick={() => setCollapsed(!collapsed)}>
        {groupTitle}
        <span>{collapsed ? '+' : '-'}</span>
      </h3>
      <div className={collapsed ? 'hidden' : ''}>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default GroupedNotes;
