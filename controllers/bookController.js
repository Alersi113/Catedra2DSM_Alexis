const { Book, User } = require('../models');

const addBook = async (req, res) => {
  const { title, author, genre, publishDate, userId } = req.body;

  try {
    if (!title || !author || !genre || !publishDate || !userId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'Todos los campos son obligatorios',
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Usuario no encontrado',
      });
    }

    if (!user.isBaseUser) {
      return res.status(403).json({
        success: false,
        error: true,
        message: 'No tiene permisos para agregar libros',
      });
    }

    const existingBook = await Book.findOne({ where: { title } });
    if (existingBook) {
        return res.status(409).json({
            success: false,
            error: true,
            message: 'Ya existe un libro con ese título',
        });
    }

    const newBook = await Book.create({
      title,
      author,
      genre,
      publishDate,
      available: true,
    });

    return res.status(201).json({
      success: true,
      error: false,
      data: newBook,
      message: 'Libro agregado exitosamente',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Error del servidor al agregar el libro',
    });
  }
};


const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    return res.status(200).json({
      success: true,
      error: false,
      data: books,
      message: 'Listado de libros obtenido correctamente',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Error del servidor al obtener los libros',
    });
  }
};

const deleteBook = async (req, res) => {
  const { userId, bookId } = req.body;  // Recibimos el id del libro y del usuario desde el body

  try {
    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'El ID de usuario y el ID del libro son obligatorios',
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Usuario no encontrado',
      });
    }

    if (!user.isBaseUser) {
      return res.status(403).json({
        success: false,
        error: true,
        message: 'No tiene permisos para eliminar libros',
      });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Libro no encontrado',
      });
    }

    if (book.eliminated) {
      return res.status(409).json({
        success: false,
        error: true,
        message: 'El libro ya está eliminado',
      });
    }

    book.eliminated = true;
    await book.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: 'Libro eliminado exitosamente',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Error del servidor al eliminar el libro',
    });
  }
};

const restoreBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const book = await Book.findByPk(bookId);

     if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'El ID de usuario y el ID del libro son obligatorios',
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Usuario no encontrado',
      });
    }

    if (!user.isBaseUser) {
      return res.status(403).json({
        success: false,
        error: true,
        message: 'No tiene permisos para eliminar libros',
      });
    }

    if (!book) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Libro no encontrado',
      });
    }

    if (!book.eliminated) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'El libro no está eliminado, no se puede restaurar',
      });
    }

    book.eliminated = false;
    await book.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: 'Libro restaurado exitosamente',
      data: book,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Error del servidor al restaurar el libro',
    });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Libro no encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: book,
      message: 'Detalle del libro obtenido correctamente',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Error del servidor al obtener el libro',
    });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publishDate, userId } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'El userId es obligatorio',
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Usuario no encontrado',
      });
    }

    if (!user.isBaseUser) {
      return res.status(403).json({
        success: false,
        error: true,
        message: 'No tiene permisos para editar libros',
      });
    }

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Libro no encontrado',
      });
    }

    // Validar si se quiere actualizar el título y que no exista otro libro con ese título
    if (title && title !== book.title) {
      const existingBook = await Book.findOne({ where: { title } });
      if (existingBook) {
        return res.status(409).json({
          success: false,
          error: true,
          message: 'Ya existe un libro con ese título',
        });
      }
    }

    // Actualizar campos solo si vienen en el body
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publishDate = publishDate || book.publishDate;

    await book.save();

    return res.status(200).json({
      success: true,
      error: false,
      data: book,
      message: 'Libro actualizado correctamente',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Error del servidor al actualizar el libro',
    });
  }
};


module.exports = { addBook, getBooks, deleteBook, restoreBook, getBookById, updateBook };