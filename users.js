export default class User {
  /**
 * Create a user.
 * @param {name} name - The name of the user.
 * @param {id} id - The uniqueID of the user.
 */
  constructor(name, id, borrowedBooks) {
    this.name = name;
    this.id = id;
    this.borrowedBooks = [];
  }
}