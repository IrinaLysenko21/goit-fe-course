import noteTemplate from '../../templates/note.hbs';
import Notepad from './notepad';
import initialNotes from '../../assets/notes.json';
const notepad = new Notepad(initialNotes);

const createListItemMarkup = note => {
  return noteTemplate(note);
};

const createItemsListMarkup = (notes) => {
 return notes.map(note => createListItemMarkup(note)).join('');
};

export const renderNoteList = (listRef, notes) => {
  listRef.innerHTML = '';
  listRef.insertAdjacentHTML('beforeend', createItemsListMarkup(notes));
};

export const addListItem = (listRef, note) => {
  const listItem = createListItem(note);
  listRef.appendChild(listItem);
};

export const removeListItem = element => {
  const parentListItem = element.closest('.note-list__item');
  const id = parentListItem.dataset.id;
  notepad.deleteNote(id);
  parentListItem.remove();
};

export const getRefs = () => ({
  searchInput: document.querySelector('.search-form__input'),
  editor: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
  titleInput: document.querySelector('input.note-editor__input'),
  bodyInput: document.querySelector('textarea.note-editor__input'),
});