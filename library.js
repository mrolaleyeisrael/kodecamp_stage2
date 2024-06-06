import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Book {
  constructor(title, author, isbn, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = isAvailable;
  }
}

export class User {
  constructor(name, id, borrowedBooks) {
    this.name = name;
    this.id = id;
    this.borrowedBooks = [];
  }
}

export class Library {
  constructor() {
    this.booksFilePath = path.join(__dirname, 'data', 'books.json');
    this.usersFilePath = path.join(__dirname, 'data', 'users.json');
    this.books = this.loadBooks();
    this.users = this.loadUsers();
  }
   
  readJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  // Load books from file
  loadBooks() {
    return this.readJSON(this.booksFilePath);
  }

  loadUsers() {
    return this.readJSON(this.usersFilePath);
  }

  saveBooks() {
    this.writeJSON(this.booksFilePath, this.books);
  }

  saveUsers() {
    this.writeJSON(this.usersFilePath, this.users);
  }

  addBook(book) {
    this.books.push(book);
    this.saveBooks();
  }
  removeBook(isbn) {
    this.books = this.books.filter(book => book.isbn !== isbn);
    this.saveBooks();
  }
  searchBook(query) {
    const searchTerm = query.toLowerCase();
    return this.books.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.isbn.includes(query)
    );
  }

  addUser(user) {
    this.users.push(user);
    this.saveUsers();
  }

  removeUser(id) {
    this.users = this.users.filter(user => user.id !== id);
    this.saveUsers();
  }

  searchUser(query) {
    const searchTerm = query.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.id.includes(query)
    );
  }

  // Borrowing System
  borrowBook(userId, isbn) {
    const user = this.users.find(user => user.id === userId);
    const book = this.books.find(book => book.isbn === isbn);

    if (user && book && book.isAvailable) {
      user.borrowedBooks.push(book);
      book.isAvailable = false;
      this.saveBooks();
      this.saveUsers();
      return true;
    }
    return false;
  }

  returnBook(userId, isbn) {
    const user = this.users.find(user => user.id === userId);
    const book = user.borrowedBooks.find(book => book.isbn === isbn);

    if (user && book) {
      user.borrowedBooks = user.borrowedBooks.filter(book => book.isbn !== isbn);
      const libraryBook = this.books.find(b => b.isbn === isbn);
      if (libraryBook) {
        libraryBook.isAvailable = true;
      }
      this.saveBooks();
      this.saveUsers();
      return true;
    }
    return false;
  }

  isBookAvailable(isbn) {
    const book = this.books.find(book => book.isbn === isbn);
    return book ? book.isAvailable : false;
  }
}

