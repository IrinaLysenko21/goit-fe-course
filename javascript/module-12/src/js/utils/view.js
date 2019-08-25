import noteTemplate from '../../templates/note.hbs';
import storage from './storage';

const createListItemMarkup = note => {
  return noteTemplate(note);
};

const createItemsListMarkup = notes => {
 return notes.map(note => createListItemMarkup(note)).join('');
};

export const renderNotesList = (listRef, notes) => {
  listRef.innerHTML = '';
  const savedNotes = storage.load('notes');

  if (savedNotes) {
    return listRef.insertAdjacentHTML('beforeend', createItemsListMarkup(savedNotes))
  }

  listRef.insertAdjacentHTML('beforeend', createItemsListMarkup(notes));
};

export const renderFilteredNotes = (listRef, notes) => {
  listRef.innerHTML = '';
  listRef.insertAdjacentHTML('beforeend', createItemsListMarkup(notes));
};

export const addListItem = (listRef, note) => {
  const listItem = createListItemMarkup(note);
  listRef.insertAdjacentHTML('beforeend', listItem);
};

export const findParentListItem = element => {
  const parentListItem = element.closest('.note-list__item');

  return parentListItem;
}

export const removeListItem = listItem => {
  listItem.remove();
};

export const getRefs = () => ({
  searchInput: document.querySelector('.search-form__input'),
  editor: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
  openEditorModalBtn: document.querySelector('button[data-action="open-editor"]'),
});