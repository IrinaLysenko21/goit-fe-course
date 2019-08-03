'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
  constructor(notes) {
    this._notes = notes;
  }

  static generateUniqueId = () =>
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

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
    this._notes.push(newItem);
    return newItem;
  }

  saveNote(note) {
    this._notes.push(note);
    return note;
  }

  findNoteById(id) {
    let noteToFind = {};
    for (let key of this._notes) {
      if (key.id === id) {
        noteToFind = key;
        return noteToFind;
      }
    }
    return undefined;
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
    console.log(query);

    return this._notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.body.toLowerCase().includes(query.toLowerCase()));
    // let searchResult = [];
    // for (let key of this._notes) {
    //   if (key.title.toLowerCase().includes(query.toLowerCase()) || key.body.toLowerCase().includes(query.toLowerCase)) {
    //     searchResult.push(key);
    //   }
    // }
    // return searchResult;
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

const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(item => createListItem(item));

  listRef.innerHTML = '';
  listRef.append(...listItems);
};

const addListItem = (listRef, note) => {
  const listItem = createListItem(note);
  listRef.appendChild(listItem);
}

const removeListItem = element => {
  const parentListItem = element.closest('.note-list__item');
  const id = parentListItem.dataset.id;
  notepad.deleteNote(id);
  parentListItem.remove();
}

const refs = {
  searchInput: document.querySelector('.search-form__input'),
  editor: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
  titleInput: document.querySelector('input.note-editor__input'),
  bodyInput: document.querySelector('textarea.note-editor__input'),
};

renderNoteList(refs.noteList, notepad.notes);

const handleEditorSubmit = (e) => {
  e.preventDefault();
  if (refs.titleInput.value.trim() === '' || refs.bodyInput.value.trim() === '') {
    return alert('Необходимо заполнить все поля!');
  }
  const noteTitle = refs.titleInput.value;
  const noteBody = refs.bodyInput.value;
  const note = notepad.saveUserInput(noteTitle, noteBody);

  addListItem(refs.noteList, note);
  e.currentTarget.reset();
}

const handleNoteClick = ({target}) => {
  if (target.nodeName !== 'I') return;
  const action = target.closest('button').dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      removeListItem(target);
      break;

    case NOTE_ACTIONS.EDIT:
      // coming soon...
      break;

    case NOTE_ACTIONS.DECREASE_PRIORITY:
      // coming soon...
      break;

    case NOTE_ACTIONS.INCREASE_PRIORITY:
      // coming soon...
      break;
  }
};

const handleFilterInput = ({target}) => {
  const filteredNotes = notepad.filterNotesByQuery(target.value);
  renderNoteList(refs.noteList, filteredNotes);
};

refs.editor.addEventListener('submit', handleEditorSubmit);
refs.noteList.addEventListener('click', handleNoteClick);
refs.searchInput.addEventListener('input', handleFilterInput);
