import {PRIORITY_TYPES} from './constants';

export default class Notepad {
  static generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

  constructor(notes) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  saveUserInput(userTitle, userBody) {
    const newItem = {
      id: Notepad.generateUniqueId(),
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
    let noteToUpdate = this.findNoteById(id);
    const updatedNote = {...noteToUpdate, ...updatedContent};
    this._notes.splice(this._notes.indexOf(noteToUpdate), 1, updatedNote);
    return updatedNote;
  }

  updateNotePriority(id, priority) {
    let noteToChangePriority = this.findNoteById(id);
    noteToChangePriority.priority = priority;
    return noteToChangePriority;
  }

  filterNotesByQuery(query = '') {
    return this._notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.body.toLowerCase().includes(query.toLowerCase()));
  }

  filterNotesByPriority(priority) {
    let searchResult = [];
    for (let key of this._notes) {
      if (key.priority === priority) {
        searchResult.push(key);
      }
    }
    return searchResult;
  }
}