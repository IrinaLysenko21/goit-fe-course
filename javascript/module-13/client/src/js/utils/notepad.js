import {PRIORITY_TYPES} from './constants';
import * as api from '../services/api';

export default class Notepad {
  constructor() {
    this._notes = [];
  }

  get notes() {
    return this._notes;
  }

  getNotes() {
    return api.getNotes().then(notes => {
      this._notes = notes;
      return this._notes;
    });
  }

  saveUserInput(userTitle, userBody) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newItem = {
          title: userTitle,
          body: userBody,
          priority: PRIORITY_TYPES.LOW,
        }

        resolve(this.saveNote(newItem).catch(console.error()));
        reject('Error');
      }, 300);
    });
  }

  saveNote(note) {
    return api.saveNote(note).then(savedNote => {
      this._notes.push(savedNote);
      return savedNote;
    });
  }

  findNoteById(id) {
    return this._notes.find(note => note.id === id);
  }

  deleteNote(id) {
    return api.deleteNote(id).then(() => {
      const noteToDelete = this.findNoteById(id);

      if (noteToDelete) {
        this._notes = this._notes.filter(note => note.id !== id);
        return noteToDelete;
      }
    });
  }

  updateNoteContent(id, updatedContent) {
    return api.updateNote(id, updatedContent).then(updatedNote => {
      const noteToUpdate = this.findNoteById(id);

      if (noteToUpdate) {
        Object.assign(noteToUpdate, updatedNote);
        return updatedNote;
      }
    });
  }

  updateNotePriority(id, newPriority) {
    return api.updateNote(id, {priority: newPriority}).then(updatedNote => {
      const noteToChangePriority = this.findNoteById(id);

      if (noteToChangePriority) {
        noteToChangePriority.priority = newPriority;
        return updatedNote;
      }
    });
  }

  filterNotesByQuery(query = '') {
    return this._notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.body.toLowerCase().includes(query.toLowerCase()));
  }

  filterNotesByPriority(priority) {
    return this._notes.filter(note => note.priority === priority);
  }
}