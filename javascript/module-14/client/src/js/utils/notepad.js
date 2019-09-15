import axios from 'axios';
import constants from './constants';

axios.defaults.baseURL = 'http://localhost:3000';

export default class Notepad {
  constructor() {
    this._notes = [];
  }

  get notes() {
    return this._notes;
  }

  async getNotes() {
    try {
      const response = await axios.get('/notes');

      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async saveUserInput(userTitle, userBody) {
    try {
      const newItem = {
        title: userTitle,
        body: userBody,
        priority: constants.PRIORITY_TYPES.LOW,
      }

      const newNote = await this.saveNote(newItem);

      return newNote;
    } catch (error) {
      throw new Error();
    }
  }

  async saveNote(note) {
    try {
      const response = await axios.post('/notes', note);

      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  findNoteById(id) {
    return this._notes.find(note => note.id === id);
  }

  async deleteNote(id) {
    try {
      const response = await axios.delete(`/notes/${id}`);

      const noteToDelete = this.findNoteById(id);

      if (noteToDelete) {
        this._notes = this._notes.filter(note => note.id !== id);
        return noteToDelete;
      }

      return response.data;
    } catch (error) {
      throw new Error();
    }
  };

  async updateNoteContent(id, updatedContent) {
    try {
      const response = await axios.patch(`/notes/${id}`, updatedContent);

      const noteToUpdate = this.findNoteById(id);

      if (noteToUpdate) {
        Object.assign(noteToUpdate, updatedNote);
        return updatedNote;
      }

      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async updateNotePriority(id, newPriority) {
    try {
      const response = await axios.patch(`/notes/${id}`, {priority: newPriority});

      const noteToChangePriority = this.findNoteById(id);

      if (noteToChangePriority) {
        noteToChangePriority.priority = newPriority;
        return updatedNote;
      }

      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  filterNotesByQuery(query = '') {
    return this._notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.body.toLowerCase().includes(query.toLowerCase()));
  }

  filterNotesByPriority(priority) {
    return this._notes.filter(note => note.priority === priority);
  }
}