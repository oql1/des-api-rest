/**
 * @typedef {{ id: number, name: string, email: string, age: number }} User
 */

export const users = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
];

let nextId =
  users.reduce((highestId, user) => Math.max(highestId, user.id), 0) + 1;

/**
 * Devuelve todos los usuarios.
 * @returns {User[]}
 */
export function getUsers() {
  return users;
}

/**
 * Busca un usuario por su ID.
 * @param {number} id
 * @returns {User|undefined}
 */
export function findUserById(id) {
  return users.find((user) => user.id === id);
}

/**
 * Crea un usuario.
 * @param {Omit<User, "id">} data
 * @returns {User}
 */
export function createUser(data) {
  const user = { ...data, id: nextId++ };
  users.push(user);
  return user;
}

/**
 * Elimina un usuario por su ID.
 * @param {number} id
 * @returns {User|undefined}
 */
export function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return undefined;

  return users.splice(index, 1)[0];
}
