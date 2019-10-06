import axios from 'axios';
import constants from './constants';

axios.defaults.baseURL = 'http://localhost:3000/';

export default class Notepad {
  constructor() {
    this._notes = [];
    this._noteToEdit = {};
    this._listItemToEdit = {};
  }

  static createUpdatedContent(newTitle, newBody) {
    const updatedContent = {
      title: newTitle,
      body: newBody,
    };

    return updatedContent;
  }

  set noteToEdit(note) {
    this._noteToEdit = note;
  }

  set listItemToEdit(listItem) {
    this._listItemToEdit = listItem;
  }

  get notes() {
    return this._notes;
  }

  get noteToEdit() {
    return this._noteToEdit;
  }

  get listItemToEdit() {
    return this._listItemToEdit;
  }

  async getNotes() {
    try {
      const response = await axios.get('notes');
      this._notes = response.data;

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveUserInput(userTitle, userBody) {
    try {
      const newItem = {
        title: userTitle,
        body: userBody,
        priority: constants.PRIORITY_TYPES.LOW,
      };

      const newNote = await this.saveNote(newItem);

      return newNote;
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveNote(note) {
    try {
      const response = await axios.post('notes', note);
      this._notes.push(response.data);

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  findNoteById(id) {
    const noteToFind = this._notes.find((note) => note.id === id);
    return noteToFind;
  }

  async deleteNote(id) {
    try {
      const noteToDelete = this.findNoteById(id);

      if (!noteToDelete) return;

      await axios.delete(`notes/${id}`);
      this._notes = this._notes.filter((note) => note.id !== id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateNoteContent(id, updatedContent) {
    try {
      const noteToUpdate = this.findNoteById(id);

      if (!noteToUpdate) return;

      const response = await axios.patch(`notes/${id}`, updatedContent);
      const updatedNote = response.data;
      Object.assign(noteToUpdate, updatedNote);
      // eslint-disable-next-line consistent-return
      return updatedNote;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateNotePriority(id, newPriority) {
    try {
      const noteToChangePriority = this.findNoteById(id);

      if (!noteToChangePriority) return;

      const updatedNote = await axios.patch(`notes/${id}`, { priority: newPriority });
      noteToChangePriority.priority = newPriority;
      // eslint-disable-next-line consistent-return
      return updatedNote.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  filterNotesByQuery(query = '') {
    return this._notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase())
    || note.body.toLowerCase().includes(query.toLowerCase()));
  }

  filterNotesByPriority(priority) {
    return this._notes.filter((note) => note.priority === priority);
  }
}
