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

  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  };

  get notes() {
    return this._notes;
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
    let noteToDelete = this.findNoteById(id);
    this._notes.splice(this._notes.indexOf(noteToDelete), 1);
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

  filterNotesByQuery(query) {
    let searchResult = [];
    for (let key of this._notes) {
      if (key.title.toLowerCase().includes(query.toLowerCase()) || key.body.toLowerCase().includes(query.toLowerCase)) {
        searchResult.push(key);
      }
    }
    return searchResult;
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

const createListItem = (note) => {
  const noteListItem = document.createElement('li');
  noteListItem.classList.add('note-list__item');
  noteListItem.setAttribute('data-id', note.id);

  const noteWrap = document.createElement('div');
  noteWrap.classList.add('note');

  noteWrap.appendChild(createNoteContent(note));
  noteWrap.appendChild(createNoteFooter(note));
  noteListItem.appendChild(noteWrap);

  return noteListItem;
};

const createNoteContent = (note) => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = note.title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = note.body;

  noteContent.appendChild(noteTitle);
  noteContent.appendChild(noteBody);

  return noteContent;
};

const createNoteFooter = () => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  noteFooter.appendChild(createPrioritySection());
  noteFooter.appendChild(createEditingSection());

  return noteFooter;
};

const createPrioritySection = () => {
  const noteSection = document.createElement('section');
  noteSection.classList.add('note__section');

  const decreasePriorityButton = document.createElement('button');
  decreasePriorityButton.classList.add('action');
  decreasePriorityButton.setAttribute('data-action', NOTE_ACTIONS.DECREASE_PRIORITY);

  const increasePriorityButton = document.createElement('button');
  increasePriorityButton.classList.add('action');
  increasePriorityButton.setAttribute('data-action', NOTE_ACTIONS.INCREASE_PRIORITY);

  const decreasePriorityIcon = document.createElement('i');
  decreasePriorityIcon.classList.add('material-icons', 'action__icon');
  decreasePriorityIcon.textContent = ICON_TYPES.ARROW_DOWN;

  const increasePriorityIcon = document.createElement('i');
  increasePriorityIcon.classList.add('material-icons', 'action__icon');
  increasePriorityIcon.textContent = ICON_TYPES.ARROW_UP;

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = PRIORITY_TYPES.LOW;

  decreasePriorityButton.appendChild(decreasePriorityIcon);
  increasePriorityButton.appendChild(increasePriorityIcon);

  noteSection.appendChild(decreasePriorityButton);
  noteSection.appendChild(increasePriorityButton);
  noteSection.appendChild(notePriority);

  return noteSection;
};

const createEditingSection = () => {
  const noteSection = document.createElement('section');
  noteSection.classList.add('note__section');

  const editButton = document.createElement('button');
  editButton.classList.add('action');
  editButton.setAttribute('data-action', NOTE_ACTIONS.EDIT);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('action');
  deleteButton.setAttribute('data-action', NOTE_ACTIONS.DELETE);

  const editIcon = document.createElement('i');
  editIcon.classList.add('material-icons', 'action__icon');
  editIcon.textContent = ICON_TYPES.EDIT;

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('material-icons', 'action__icon');
  deleteIcon.textContent = ICON_TYPES.DELETE;

  editButton.appendChild(editIcon);
  deleteButton.appendChild(deleteIcon);

  noteSection.appendChild(editButton);
  noteSection.appendChild(deleteButton);

  return noteSection;
};

const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(item => createListItem(item));

  listRef.append(...listItems);
};

const noteList = document.querySelector('.note-list');

renderNoteList(noteList, notepad.notes);