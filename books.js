export default class Book {
  /**
* Create a book.
* @param {title} title - The title of the book.
* @param {author} author - The author of the book.
* @param {isbn} isbn - The isbn of the user.
*/
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = true;
  }
}
