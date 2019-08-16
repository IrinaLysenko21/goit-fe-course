import Micromodal from 'micromodal';
import {NOTE_ACTIONS} from './constants';
import initialNotes from '../../assets/notes.json';
import Notepad from './notepad';
import {renderNoteList, addListItem, findParentListItem, removeListItem, getRefs} from './view';
import successMsg from '../components/Success/Success';
import errorMsg from '../components/Error/Error'

const notepad = new Notepad(initialNotes);
const refs = getRefs();

renderNoteList(refs.noteList, notepad.notes);

const handleOpenEditorModal = () => {
  Micromodal.show('note-editor-modal');
  refs.editor.reset();
};

const handleEditorSubmit = evt => {
  evt.preventDefault();

  const [input, textarea] = evt.target.elements;

  if (input.value.trim() === '' || textarea.value.trim() === '') {
    return errorMsg('Необходимо заполнить все поля!');
  }

  const noteTitle = input.value;
  const noteBody = textarea.value;
  const note = notepad.saveUserInput(noteTitle, noteBody);

  addListItem(refs.noteList, note);
  successMsg('Заметка успешно добавлена!');

  evt.currentTarget.reset();
  Micromodal.close('note-editor-modal');
}

const handleNoteClick = ({target}) => {
  if (target.nodeName !== 'I') return;
  const action = target.closest('button').dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      const listItemToDelete = findParentListItem(target);
      notepad.deleteNote(listItemToDelete.dataset.id);
      removeListItem(listItemToDelete);
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
  const filteredNotes = notepad.filterNotesByQuery(target.value);
  renderNoteList(refs.noteList, filteredNotes);
};

refs.openEditorModalBtn.addEventListener('click', handleOpenEditorModal);
refs.editor.addEventListener('submit', handleEditorSubmit);
refs.noteList.addEventListener('click', handleNoteClick);
refs.searchInput.addEventListener('input', handleFilterInput);