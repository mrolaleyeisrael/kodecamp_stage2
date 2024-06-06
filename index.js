

import { Book, User, Library } from "./library.js";


const library = new Library()

const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '1234567890');
const book2 = new Book('1984', 'George Orwell', '1234567891');
library.addBook(book1);
library.addBook(book2);

// Add some users to the library
const user1 = new User('Alice', '001');
const user2 = new User('Bob', '002');
library.addUser(user1);
library.addUser(user2);

// Borrow a book
library.borrowBook('001', '1234567890');

// Check if a book is available
console.log(library.isBookAvailable('1234567890')); // false

// Return a book
library.returnBook('001', '1234567890');

// Check if a book is available again
console.log(library.isBookAvailable('1234567890')); // true

// Search for a book
console.log(library.searchBook('1984'));

// Search for a user
console.log(library.searchUser('Alice'));
