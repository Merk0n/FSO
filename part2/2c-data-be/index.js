const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const Note = require('./models/note');
// require('dotenv').config();

// const mongoose = require('mongoose');

// const url = process.env.MONGODB_URI;

// mongoose.set('strictQuery', false);

// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// const Note = mongoose.model('Note', noteSchema);

// // const note = new Note({
// //   content: 'ehh',
// //   important: true,
// // });
// // note.save().then((result) => {
// //   console.log('note saved!');
// //   mongoose.connection.close();
// // });

// // Note.find({}).then((result) => {
// //   result.forEach((note) => {
// //     console.log(note);
// //   });
// //   mongoose.connection.close();
// // });

app.use(express.static('dist'));
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :body')
);

app.use(express.json());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

//add note
app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (
    !body.content ||
    body.important === undefined ||
    body.important === null ||
    typeof body.important !== 'boolean'
  ) {
    return response.status(400).json({
      error: 'content or importance is missing',
    });
  }

  if (notes.find((note) => note.content === body.content)) {
    return response.status(400).json({
      error: 'content must be unique',
    });
  }

  const note = {
    id: Math.floor(Math.random() * 1000),
    content: body.content,
    important: body.important,
  };

  notes = notes.concat(note);

  response.json(note);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
