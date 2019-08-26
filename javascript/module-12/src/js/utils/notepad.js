import shortid from 'shortid';
import {PRIORITY_TYPES} from './constants';
import storage from './storage';

export default class Notepad {
  constructor(notes) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  checkingStorage() {
    const savedNotes = storage.load('notes');

    if (savedNotes) {
      this._notes = savedNotes;
    }

    return this._notes;
  }

  saveUserInput(userTitle, userBody) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newItem = {
          id: shortid.generate(),
          title: userTitle,
          body: userBody,
          priority: PRIORITY_TYPES.LOW,
        }

        this.saveNote(newItem).catch(console.error());

        resolve(newItem);
        reject('Error');
      }, 300);
    });
  }

  saveNote(note) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.checkingStorage().push(note);
        storage.save('notes', this._notes);

        resolve(note);
        reject('Error');
      }, 300);
    });
  }

  findNoteById(id) {
    return this.checkingStorage().find(note => note.id === id);
  }

  deleteNote(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const noteToDelete = this.findNoteById(id);

        if (noteToDelete) {
          storage.save('notes', this.checkingStorage().filter(note => note.id !== id));
          resolve(noteToDelete);
        }

        reject('Error');
      }, 300);
    });
  }

  updateNoteContent(id, updatedContent) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          const noteToUpdate = this.findNoteById(id);

          if (noteToUpdate) {
            Object.assign(noteToUpdate, updatedContent);
            storage.save('notes', this._notes);
            resolve(noteToUpdate);
          }

          reject('Error');
      }, 300);
    });
  }

  updateNotePriority(id, priority) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const noteToChangePriority = this.findNoteById(id);

        if (noteToChangePriority) {
          noteToChangePriority.priority = priority;
          storage.save('notes', this._notes);
          resolve(noteToChangePriority);
        }

        reject('Error');
      }, 300);
    });
  }

  filterNotesByQuery(query = '') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const searchResult = this.checkingStorage().filter(note => note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.body.toLowerCase().includes(query.toLowerCase()));

        resolve(searchResult);
        reject('Error');
      }, 300);
    });
  }

  filterNotesByPriority(priority) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const searchResult = this.checkingStorage().filter(note => note.priority === priority);

        resolve(searchResult);
        reject('Error');
      }, 300);
    })
  }
}