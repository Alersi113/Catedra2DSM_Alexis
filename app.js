const express = require('express');
require('dotenv').config();
console.log('JWT_SECRET en app.js:', process.env.JWT_SECRET);
const app = express();
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');


app.use(express.json());

// Ruta funcionalidades de usuario
app.post('/register', userController.register);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.post('/login', userController.login);

app.get('/me', userController.getProfile);

//Rutas funcionalidades de libro
app.post('/add/book', bookController.addBook);

app.get('/books', bookController.getBooks);

app.delete('/book', bookController.deleteBook);

app.put('/restore/book', bookController.restoreBook);

app.get('/book/:id', bookController.getBookById);

app.put('/book/:id', bookController.updateBook);