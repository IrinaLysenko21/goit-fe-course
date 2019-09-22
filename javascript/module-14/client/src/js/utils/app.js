import Micromodal from 'micromodal';
import constants from './constants';
import Notepad from './notepad';
import view from './view';
import successMsg from '../components/Success/Success';
import errorMsg from '../components/Error/Error';
import storage from './storage';

const notepad = new Notepad();
const refs = view.getRefs();

(async () => {
  try {
    const notes = await notepad.getNotes();
    view.renderNotesList(refs.noteList, notes);

    return notes.data;
  } catch (error) {
    throw error;
  }
})();



const handleOpenEditorModal = () => {
  Micromodal.show('note-editor-modal');

  if (refs.editor.classList.contains('edit')) {
    refs.editor.classList.replace('edit', 'add');
  }

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




const handleAddingSubmit = evt => {
  evt.preventDefault();

  if (!evt.currentTarget.classList.contains('add')) return;

  const [input, textarea] = evt.target.elements;

  if (input.value.trim() === '' || textarea.value.trim() === '') {
    return errorMsg('Необходимо заполнить все поля!');
  }

  const noteTitle = input.value;
  const noteBody = textarea.value;

  (async () => {
    try {
      const note = await notepad.saveUserInput(noteTitle, noteBody);
      view.addListItem(refs.noteList, note);
      successMsg('Заметка успешно добавлена!');

      return note;
    } catch (error) {
      throw errorMsg('Ошибка при добавлении заметки!');
    }
  })();

  storage.remove('noteTitle');
  storage.remove('noteBody');

  evt.currentTarget.reset();
  Micromodal.close('note-editor-modal');
};








const handleNoteClick = ({target}) => {
  if (target.nodeName !== 'I') return;
  const action = target.closest('button').dataset.action;

  switch (action) {
    case constants.NOTE_ACTIONS.DELETE:
      const listItemToDelete = view.findParentListItem(target);
      (async () => {
        try {
          const deletedNote = await notepad.deleteNote(listItemToDelete.dataset.id);
          view.removeListItem(listItemToDelete);
          successMsg('Заметка успешно удалена!');

          return deletedNote;
        } catch (error) {
          throw errorMsg('Ошибка при удалении заметки!');
        }
      })();

      break;

    case constants.NOTE_ACTIONS.EDIT:
          Micromodal.show('note-editor-modal');

          if (refs.editor.classList.contains('add')) {
            refs.editor.classList.replace('add', 'edit');
          }

          const listItemToEdit = view.findParentListItem(target);
          const noteToEdit = notepad.findNoteById(listItemToEdit.dataset.id);

          const [input, textarea] = refs.editor.elements;
          input.value = noteToEdit.title;
          textarea.value = noteToEdit.body;

          const handleEditingSubmit = evt => {
            evt.preventDefault();

            if (!evt.currentTarget.classList.contains('edit')) return;

            (async () => {
              try {
              const updatedContent = notepad.createUpdatedContent(input.value, textarea.value);

              console.log(updatedContent);

              const updatedNote = await notepad.updateNoteContent(noteToEdit.id, updatedContent);

              const listItemToEdit = view.findParentListItem(target);
              view.editListItemContent(listItemToEdit, updatedContent.title, updatedContent.body);
              successMsg('Заметка успешно отредактирована!');

              console.log(updatedNote);

              return updatedNote;
            } catch (error) {
              throw errorMsg('Ошибка при редактировании заметки!');
            }})();

            evt.currentTarget.reset();
            Micromodal.close('note-editor-modal');
          };

          refs.editor.addEventListener('submit', handleEditingSubmit);

      break;

    case constants.NOTE_ACTIONS.DECREASE_PRIORITY:
      const listItemToDecreasePriority = view.findParentListItem(target);
      const noteToDecreasePriority = notepad.findNoteById(listItemToDecreasePriority.dataset.id);

      if (noteToDecreasePriority.priority >= 1) {
        noteToDecreasePriority.priority -= 1;

        (async () => {
          try {
          const updatedNote = await notepad.updateNotePriority(noteToDecreasePriority.id, noteToDecreasePriority.priority);
          view.editListItemPriority(listItemToDecreasePriority, noteToDecreasePriority.priority);
          successMsg('Приоритет заметки понижен!');

          return updatedNote;
        } catch (error) {
          throw errorMsg('Ошибка при редактировании заметки!');
        }})();
      }

      break;

    case constants.NOTE_ACTIONS.INCREASE_PRIORITY:
      const listItemToIncreasePriority = view.findParentListItem(target);
      const noteToIncreasePriority = notepad.findNoteById(listItemToIncreasePriority.dataset.id);

      if (noteToIncreasePriority.priority <= 1) {
        noteToIncreasePriority.priority += 1;

        (async () => {
          try {
          const updatedNote = await notepad.updateNotePriority(noteToIncreasePriority.id, noteToIncreasePriority.priority);
          view.editListItemPriority(listItemToIncreasePriority, noteToIncreasePriority.priority);
          successMsg('Приоритет заметки повышен!');

          return updatedNote;
        } catch (error) {
          throw errorMsg('Ошибка при редактировании заметки!');
        }})();
      }
      break;
  }
};



const handleFilterInput = ({target}) => {
  view.renderNotesList(refs.noteList, notepad.filterNotesByQuery(target.value));
};



refs.openEditorModalBtn.addEventListener('click', handleOpenEditorModal);
refs.editor.addEventListener('keyup', handleEditorInputSaving);
refs.editor.addEventListener('submit', handleAddingSubmit);
// refs.editor.addEventListener('submit', handleEditingSubmit);
refs.noteList.addEventListener('click', handleNoteClick);
refs.searchInput.addEventListener('input', handleFilterInput);