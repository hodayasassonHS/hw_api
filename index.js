const express = require('express');
const app = express();
app.use(express.json());

// Array to hold notes (simulating a database)
let notes = [];

// Get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Get a specific note by ID
app.get('/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find((n) => n.id == parseInt(id));

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.json(note);
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const newNote = {
    id: notes.length + 1,
    title,
    content,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.put('/notes/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const noteIndex = notes.findIndex((n) => n.id === parseInt(id));

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const updatedNote = {
    id: parseInt(id),
    title,
    content,
  };
  notes[noteIndex] = updatedNote;
  res.json(updatedNote);
});

app.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  const noteIndex = notes.findIndex((n) => n.id === parseInt(id));

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const deletedNote = notes.splice(noteIndex, 1);
  res.json({ message: 'Note deleted', deletedNote });
});

// Run the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
