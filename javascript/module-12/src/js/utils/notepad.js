import {PRIORITY_TYPES} from './constants';
import shortid from 'shortid';

export default class Notepad {
  constructor(notes) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  saveUserInput(userTitle, userBody) {
    const newItem = {
      id: shortid.generate(),
      title: userTitle,
      body: userBody,
      priority: PRIORITY_TYPES.LOW,
    }
    return this.saveNote(newItem);
  }

  saveNote(note) {
    this._notes.push(note);
    return note;
  }

  findNoteById(id) {
    return this._notes.find(note => note.id === id);
  }

  deleteNote(id) {
    this._notes = this._notes.filter(note => note.id !== id);
  }

  updateNoteContent(id, updatedContent) {
    const index = this._notes.indexOf(this.findNoteById(id));

    if (this._notes[index]) {
      return this._notes[index] = {...this._notes[index], ...updatedContent};
    }
  }

  updateNotePriority(id, priority) {
    let noteToChangePriority = this.findNoteById(id);

    if (noteToChangePriority) {
    noteToChangePriority.priority = priority;
    return noteToChangePriority;
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