import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { supabase } from '../../services/supabaseClient';

export default function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [note, setNote] = useState({ title: '', body: '' });
  const [isSaving, setIsSaving] = useState(false);

  const fetchNote = useCallback(async () => {
    if (!id) return;
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Error fetching note:', error);
      return;
    }
    if (data) {
      setNote(data);
    }
  }, [id]);

  const saveNote = useCallback(async () => {
    if (!id) return;
    if (note.title.trim() && note.body.trim()) {
      setIsSaving(true);
      const { error } = await supabase
        .from('notes')
        .update({ title: note.title, body: note.body })
        .eq('id', id);
      if (error) {
        console.error('Error updating note:', error);
      } else {
        queryClient.invalidateQueries('notes');
      }
      setIsSaving(false);
    }
  }, [id, note, queryClient]);

  const handleDelete = async () => {
    if (!id) return;
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting note:', error);
      return;
    }
    queryClient.invalidateQueries('notes');
    navigate('/');
  };

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  return (
    <div className="note-detail">
      <div className="note-content">
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote(prev => ({ ...prev, title: e.target.value }))}
          onBlur={saveNote}
          className="note-title"
          placeholder="Note Title"
        />
        <textarea
          value={note.body}
          onChange={(e) => setNote(prev => ({ ...prev, body: e.target.value }))}
          onBlur={saveNote}
          className="note-body"
          placeholder="Write your note here..."
        />
      </div>
      <div className="button-group">
        <Link to="/" className="btn btn-secondary">
          Back to Notes
        </Link>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this note?')) {
              handleDelete();
            }
          }}
          className="btn btn-danger"
        >
          Delete Note
        </button>
      </div>
      {isSaving && <div className="saving-indicator">Saving...</div>}
    </div>
  );
}