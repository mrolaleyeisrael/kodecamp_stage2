import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Library class to manage the books and users.
*/
export class Library {

  /**
* Manage users and books.
* @param {name} name - The name of the user.
*/
  constructor() {
    this.booksFilePath = path.join(__dirname, 'data', 'books.json');
    this.usersFilePath = path.join(__dirname, 'data', 'users.json');
    this.books = this.loadBooks();
    this.users = this.loadUsers();
  }


  /**
   * Read the content of the json file for both users and the books.
   * @param {filePath} filePath - The filePath of the data.
   * @return {data} The data be it user or books.
   */
  readJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  /**
   * Write to a file.
   * @param {filePath} filePath - The filePath of the user.
   * @param {data} id - The uniqueID of the user.
*/
  writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  /**
   * Load the number of books in the file
   * @return The filepath of the json file.
   */
  loadBooks() {
    return this.readJSON(this.booksFilePath);
  }

  /**
 * Load the number of users in the file
 * @return The filepath of the json file.
 */
  loadUsers() {
    return this.readJSON(this.usersFilePath);
  }

  /**
   * Saves the list of books to the JSON file.
   */
  saveBooks() {
    this.writeJSON(this.booksFilePath, this.books);
  }

  /**
   * Saves the list of users to the JSON file.
   */
  saveUsers() {
    this.writeJSON(this.usersFilePath, this.users);
  }

  /**
   * Adds a book to the library.
   * @param {Book} book - The book to add.
   */
  addBook(book) {
    const bookExists = this.books.find(b => b.isbn === book.isbn)
    if (bookExists) {
      console.log(`Book with isbn number ${book.isbn} already exists`)
    } else {
      this.books.push(book);
      this.saveBooks();
    }
  }

  /**
   * Removes book base on isbn
   * @param {isbn} isbn - The isbn of the book to be removed.
   */
  removeBook(isbn) {
    const bookExist = this.books.find(b => b.isbn === isbn)
    if (bookExist) {
      this.books = this.books.filter(book => book.isbn !== isbn);
      this.saveBooks();
    } else {
      return "Book does not exist in the library"
    }
  }

  /**
  * Searches for books in the library.
  * @param {string} query - The search query (title, author, or ISBN).
  * @returns {Array} The list of books that match the query.
  */
  searchBook(query) {
    const searchTerm = query.toLowerCase();
    
    return this.books.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.isbn.includes(query)
    );
  }


  /**
   * Adds a user to the library.
   * @param {User} user - The user to add.
   */
  addUser(user) {
    this.users.push(user);
    this.saveUsers();
  }


  /**
   * Removes a user from the library.
   * @param {string} id - The ID of the user to remove.
   */
  removeUser(id) {
    this.users = this.users.filter(user => user.id !== id);
    this.saveUsers();
  }

  /**
  * Searches for users in the library.
  * @param {string} query - The search query (name or ID).
  * @returns {Array} The list of users that match the query.
  */
  searchUser(query) {
    const searchTerm = query.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.id.includes(query)
    );
  }

  /**
   * Allows a user to borrow a book.
   * @param {string} userId - The ID of the user.
   * @param {string} isbn - The ISBN of the book.
   * @returns {boolean} Whether the operation was successful.
   */
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


  /**
 * Allows a user to return a borrowed book.
 * @param {string} userId - The ID of the user.
 * @param {string} isbn - The ISBN of the book.
 * @returns {boolean} Whether the operation was successful.
 */
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

  /**
 * Checks if a book is available in the library.
 * @param {string} isbn - The ISBN of the book.
 * @returns {boolean} Whether the book is available.
 */
  isBookAvailable(isbn) {
    const book = this.books.find(book => book.isbn === isbn);
    return book ? book.isAvailable : false;
  }
}

