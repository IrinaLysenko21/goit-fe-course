import axios from 'axios';
import Notepad from '../js/utils/notepad';

const notesForTesting = [
  {
    "id": "id-1",
    "title": "JavaScript essentials",
    "body": "Get comfortable with all basic JavaScript concepts",
    "priority": 2
  },
  {
    "id": "id-2",
    "title": "Refresh HTML and CSS",
    "body": "Need to refresh HTML and CSS concepts, after learning some JavaScript",
    "priority": 1
  },
  {
    "id": "id-3",
    "title": "Get comfy with Frontend frameworks",
    "body": "First must get some general knowledge about frameworks, then maybe try each one for a week or so",
    "priority": 1
  },
  {
    "id": "id-4",
    "title": "Winter clothes",
    "body": "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc",
    "priority": 0
  }
];

describe('Notepad', () => {
  let notepad;

  beforeEach(() => {
    notepad = new Notepad();
  });

  it('should find a note by id', () => {
    notepad._notes = notesForTesting;
    notepad.findNoteById("id-2");

    expect("id-2").toBe(notepad.findNoteById("id-2").id);
  });

  it('should set a note to edit', () => {
    const note = {
      "id": "id-4",
      "title": "Winter clothes",
      "body": "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc",
      "priority": 2
    };
    notepad.noteToEdit = note;

    expect(notepad._noteToEdit).toMatchObject(note);
  });

  it('should get a note to edit', () => {
    notepad._noteToEdit = {
      "id": "id-4",
      "title": "Winter clothes",
      "body": "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc",
      "priority": 0
    };

    expect(notepad.noteToEdit).toMatchObject(notepad._noteToEdit);
  });

  it('should return a note that contains a string', () => {
    notepad._notes = notesForTesting;
    const note = {
      "id": "id-4",
      "title": "Winter clothes",
      "body": "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc",
      "priority": 0
    };

    expect(notepad.filterNotesByQuery("winter")).toMatchObject([note]);
  });

  it('should return an array of notes that contain a string', async () => {
    notepad._notes = notesForTesting;
    const notes = [
      {
        "id": "id-1",
        "title": "JavaScript essentials",
        "body": "Get comfortable with all basic JavaScript concepts",
        "priority": 2
      },
      {
        "id": "id-2",
        "title": "Refresh HTML and CSS",
        "body": "Need to refresh HTML and CSS concepts, after learning some JavaScript",
        "priority": 1
      }
    ]

    expect(notepad.filterNotesByQuery("javascript")).toMatchObject(notes);
  });

  it('should filter a note with 0 priority', () => {
    notepad._notes = notesForTesting;
    const note = {
      "id": "id-4",
      "title": "Winter clothes",
      "body": "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc",
      "priority": 0
    };

    expect(notepad.filterNotesByPriority(0)).toMatchObject([note]);
  });
});

describe('Notepad async', () => {
  let notepad;

  beforeEach(() => {
    notepad = new Notepad();
  });

  it('should get notes from server', async () => {
    const notes = await notepad.getNotes();

    expect(notepad._notes).toEqual(notes);
  });

  it('should get notes from notepad', async () => {
    const notes = await notepad.getNotes();

    expect(notepad.notes).toEqual(notes);
  });

  it('should create a new note', async () => {
    const note = await notepad.saveUserInput("title", "body");

    expect(typeof note === 'object').toBe(true);
  });

  it('should add a new item to the notepad.notes array', async () => {
    const notes = await notepad.getNotes();
    const notesQuantityBeforeAdding = notes.length;
    await notepad.saveNote({title: "title", body: "body", priority: 0});

    expect(notepad.notes.length).toBe(notesQuantityBeforeAdding + 1);
  });

  it('should add id to a new note', async () => {
    const note = await notepad.saveNote({title: "title", body: "body", priority: 0});

    expect(note).toHaveProperty('id');
  });

  it('should remove an item from the notepad.notes array', async () => {
    const notes = await notepad.getNotes();
    const notesQuantityBeforeDeleting = notes.length;
    const id = notes[notes.length - 1].id;
    await notepad.deleteNote(id);

    expect(notepad.notes.length).toBe(notesQuantityBeforeDeleting - 1);
  });

  it(`shouldn't find a note by id of already deleted note`, async () => {
    const notes = await notepad.getNotes();
    const id = notes[notes.length - 1].id;
    await notepad.deleteNote(id);

    expect(notepad.findNoteById(id)).toBe(undefined);
  });

  it('should change note title and body for new ones', async () => {
    const notes = await notepad.getNotes();
    const note = notes[notes.length - 1];
    const updatedNote = await notepad.updateNoteContent(note.id, {title: "new title", body: "new body"});

    expect({title: "new title", body: "new body"}).toMatchObject({title: updatedNote.title, body: updatedNote.body});
  });

  it('should change note priority for new one', async () => {
    const notes = await notepad.getNotes();
    const note = notepad.notes[notes.length - 1];
    const updatedNote = await notepad.updateNotePriority(note.id, 2);

    expect(updatedNote.priority).toBe(2);
  });

  it('should throw an error while saving user input', async () => {
    axios.defaults.baseURL = 'http://localhost:300/';

    await expect(notepad.saveUserInput("title", "body"))
    .rejects.toThrow();
  });

  it('should throw an error while saving note', async () => {
    await expect(notepad.saveNote({title: "title", body: "body", priority: 0}))
    .rejects.toThrow();
  });

  it('should throw an error while removing', async () => {
    axios.defaults.baseURL = 'http://localhost:3000/';
    const notes = await notepad.getNotes();
    axios.defaults.baseURL = 'http://localhost:300/';
    const id = notes[notes.length - 1].id;

    await expect(notepad.deleteNote(id)).rejects.toThrow();
  });

  it('should throw an error while updating note content', async () => {
    axios.defaults.baseURL = 'http://localhost:3000/';
    const notes = await notepad.getNotes();
    axios.defaults.baseURL = 'http://localhost:300/';
    const id = notes[notes.length - 1].id;

    await expect(notepad.updateNoteContent(id, {title: "new title", body: "new body"}))
    .rejects.toThrow();
  });

  it('should throw an error while updating note priority', async () => {
    axios.defaults.baseURL = 'http://localhost:3000/';
    const notes = await notepad.getNotes();
    axios.defaults.baseURL = 'http://localhost:300/';
    const id = notes[notes.length - 1].id;

    await expect(notepad.updateNotePriority(id, 2))
    .rejects.toThrow();
  });
});
