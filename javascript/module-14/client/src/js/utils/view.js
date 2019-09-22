import noteTemplate from '../../templates/note.hbs';

const createListItemMarkup = note => {
  return noteTemplate(note);
};

const createItemsListMarkup = notes => {
 return notes.map(note => createListItemMarkup(note)).join('');
};

const renderNotesList = (listRef, notes) => {
  listRef.innerHTML = '';
  listRef.insertAdjacentHTML('beforeend', createItemsListMarkup(notes));
};

const addListItem = (listRef, note) => {
  const listItem = createListItemMarkup(note);
  listRef.insertAdjacentHTML('beforeend', listItem);
};

const findParentListItem = element => {
  const parentListItem = element.closest('.note-list__item');
  return parentListItem;
}

const removeListItem = listItem => {
  listItem.remove();
};

const editListItemContent = (listItem, title, body) => {
  console.log(listItem.querySelector('.note__title'));
  console.log(listItem.querySelector('.note__body'));

  listItem.querySelector('.note__title').innerHTML = title;
  listItem.querySelector('.note__body').innerHTML = body;
};

const editListItemPriority = (listItem, priority) => {
  listItem.querySelector('.note__priority').innerHTML = priority;
};

const getRefs = () => ({
  searchInput: document.querySelector('.search-form__input'),
  editor: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
  openEditorModalBtn: document.querySelector('button[data-action="open-editor"]'),
});

export default {renderNotesList, addListItem, findParentListItem, removeListItem, getRefs, editListItemContent, editListItemPriority};