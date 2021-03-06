import Micromodal from 'micromodal';
import {NOTE_ACTIONS} from './constants';
import initialNotes from '../../assets/notes.json';
import Notepad from './notepad';
import view from './view';
import successMsg from '../components/Success/Success';
import errorMsg from '../components/Error/Error'
import storage from './storage';

const notepad = new Notepad(initialNotes);
const refs = view.getRefs();

view.renderNotesList(refs.noteList, notepad.notes);

const handleOpenEditorModal = () => {
  Micromodal.show('note-editor-modal');

  const noteTitle = storage.load('noteTitle');
  const noteBody = storage.load('noteBody');

  if (noteTitle || noteBody) {
    const [input, textarea] = refs.editor.elements;

    input.value = noteTitle;
    textarea.value = noteBody;
  }
};

const handleEditorInputSaving = evt => {
  const [input, textarea] = evt.currentTarget.elements;

  storage.save('noteTitle', input.value);
  storage.save('noteBody', textarea.value);
};

const handleEditorSubmit = evt => {
  evt.preventDefault();

  const [input, textarea] = evt.target.elements;

  if (input.value.trim() === '' || textarea.value.trim() === '') {
    return errorMsg('Необходимо заполнить все поля!');
  }

  const noteTitle = input.value;
  const noteBody = textarea.value;

  notepad.saveUserInput(noteTitle, noteBody)
  .then(note => view.addListItem(refs.noteList, note))
  .catch(console.error());
  successMsg('Заметка успешно добавлена!');

  storage.remove('noteTitle');
  storage.remove('noteBody');

  evt.currentTarget.reset();
  Micromodal.close('note-editor-modal');
}

const handleNoteClick = ({target}) => {
  if (target.nodeName !== 'I') return;
  const action = target.closest('button').dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      const listItemToDelete = view.findParentListItem(target);
      notepad.deleteNote(listItemToDelete.dataset.id).catch(console.error());
      view.removeListItem(listItemToDelete);
      successMsg('Заметка успешно удалена!');
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
  notepad.filterNotesByQuery(target.value)
  .then(filteredNotes => view.renderFilteredNotes(refs.noteList, filteredNotes))
  .catch(console.error());
};

refs.openEditorModalBtn.addEventListener('click', handleOpenEditorModal);
refs.editor.addEventListener('keyup', handleEditorInputSaving);
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.noteList.addEventListener('click', handleNoteClick);
refs.searchInput.addEventListener('input', handleFilterInput);