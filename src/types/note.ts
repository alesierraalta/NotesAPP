// src/types/note.ts
export type Note = {
    id: string;
    title: string;
    body: string;
    // Add any other properties your note might have
  };
  
  export type Tables = {
    notes: Note;
    // Add other tables here if needed
  };