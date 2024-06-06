import { Library } from "./library.js";
import Book from "./books.js";
import User from "./users.js";

const library = new Library()

const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '12345690');
const book2 = new Book('1984', 'George Orwell', '123467891');
library.addBook(book1);
library.addBook(book2);

const user1 = new User('Alice', '001');
const user2 = new User('Bob', '002');
library.addUser(user1);
library.addUser(user2);

library.borrowBook('001', '1234567890');

console.log(library.isBookAvailable('1234567890'));

library.returnBook('001', '1234567890');

console.log(library.isBookAvailable('1234567890'));

console.log(library.searchBook('1984'));

console.log(library.searchUser('Alice'));

console.log(library.removeBook("1234567891"))
