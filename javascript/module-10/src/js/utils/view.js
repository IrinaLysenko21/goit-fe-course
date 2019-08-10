import {PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS} from './constants';
import Notepad from './notepad';
import initialNotes from '../../assets/notes.json';
const notepad = new Notepad(initialNotes);

const createElement = (tag, className) => {
  const createElement = document.createElement(tag);
  createElement.classList.add(className);
  return createElement;
};

const createNoteContent = (note) => {
  const noteContent = createElement('div', 'note__content');

  const noteTitle = createElement('h2', 'note__title');
  noteTitle.textContent = note.title;

  const noteBody = createElement('p', 'note__body');
  noteBody.textContent = note.body;

  noteContent.appendChild(noteTitle);
  noteContent.appendChild(noteBody);

  return noteContent;
};

const createPrioritySection = () => {
  const noteSection = createElement('section', 'note__section');

  const decreasePriorityButton = createElement('button', 'action');
  decreasePriorityButton.setAttribute('data-action', NOTE_ACTIONS.DECREASE_PRIORITY);

  const increasePriorityButton = createElement('button', 'action');
  increasePriorityButton.setAttribute('data-action', NOTE_ACTIONS.INCREASE_PRIORITY);

  const decreasePriorityIcon = createElement('i', 'material-icons');
  decreasePriorityIcon.classList.add('action__icon');
  decreasePriorityIcon.textContent = ICON_TYPES.ARROW_DOWN;

  const increasePriorityIcon = createElement('i', 'material-icons');
  increasePriorityIcon.classList.add('action__icon');
  increasePriorityIcon.textContent = ICON_TYPES.ARROW_UP;

  const notePriority = createElement('span', 'note__priority');
  notePriority.textContent = PRIORITY_TYPES.LOW;

  decreasePriorityButton.appendChild(decreasePriorityIcon);
  increasePriorityButton.appendChild(increasePriorityIcon);

  noteSection.appendChild(decreasePriorityButton);
  noteSection.appendChild(increasePriorityButton);
  noteSection.appendChild(notePriority);

  return noteSection;
};

const createEditingSection = () => {
  const noteSection = createElement('section', 'note__section');

  const editButton = createElement('button', 'action');
  editButton.setAttribute('data-action', NOTE_ACTIONS.EDIT);

  const deleteButton = createElement('button', 'action');
  deleteButton.setAttribute('data-action', NOTE_ACTIONS.DELETE);

  const editIcon = createElement('i', 'material-icons');
  editIcon.classList.add('action__icon');
  editIcon.textContent = ICON_TYPES.EDIT;

  const deleteIcon = createElement('i', 'material-icons');
  deleteIcon.classList.add('action__icon');
  deleteIcon.textContent = ICON_TYPES.DELETE;

  editButton.appendChild(editIcon);
  deleteButton.appendChild(deleteIcon);

  noteSection.appendChild(editButton);
  noteSection.appendChild(deleteButton);

  return noteSection;
};

const createNoteFooter = () => {
  const noteFooter = createElement('footer', 'note__footer');

  noteFooter.appendChild(createPrioritySection());
  noteFooter.appendChild(createEditingSection());

  return noteFooter;
};

const createListItem = (note) => {
  const noteListItem = createElement('li', 'note-list__item');
  noteListItem.setAttribute('data-id', note.id);

  const noteWrap = createElement('div', 'note');

  noteWrap.appendChild(createNoteContent(note));
  noteWrap.appendChild(createNoteFooter(note));
  noteListItem.appendChild(noteWrap);

  return noteListItem;
};

export const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(item => createListItem(item));
  listRef.innerHTML = '';
  listRef.append(...listItems);
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

