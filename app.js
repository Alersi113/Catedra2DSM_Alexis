const express = require('express');
const app = express();
const userController = require('./controllers/userController');

app.use(express.json());

// Ruta para registrar usuario
app.post('/register', userController.register);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
