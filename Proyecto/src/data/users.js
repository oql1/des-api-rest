import { hashPassword, verifyPassword } from "../utils/passwords.js";

/**
 * @typedef {{ id: number, name: string, email: string, age: number, phone?: string }} User
 */

// Usuarios de ejemplo para desarrollo; solo se conservan sus hashes en memoria.
const users = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25, passwordHash: await hashPassword("Alice123!") },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30, passwordHash: await hashPassword("Bob12345!") },
];

function publicUser({ passwordHash, ...user }) {
  return user;
}

let nextId =
  users.reduce((highestId, user) => Math.max(highestId, user.id), 0) + 1;

/**
 * Devuelve todos los usuarios.
 * @returns {User[]}
 */
export function getUsers() {
  return users.map(publicUser);
}

/**
 * Busca un usuario por su ID.
 * @param {number} id
 * @returns {User|undefined}
 */
export function findUserById(id) {
  const user = users.find((user) => user.id === id);
  return user ? publicUser(user) : undefined;
}

/**
 * Crea un usuario con contraseña almacenada como hash, si el correo está disponible.
 * @param {Omit<User, "id"> & { password: string }} data
 * @returns {Promise<User|undefined>}
 */
export async function createUser({ password, ...data }) {
  const email = data.email.trim().toLowerCase();
  const passwordHash = await hashPassword(password);
  if (users.some((user) => user.email === email)) return undefined;

  const user = { ...data, email, passwordHash, id: nextId++ };
  users.push(user);
  return publicUser(user);
}

/**
 * Valida el correo y la contraseña de un usuario.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User|undefined>}
 */
export async function authenticateUser(email, password) {
  const user = users.find((user) => user.email === email.trim().toLowerCase());
  if (!user || !(await verifyPassword(password, user.passwordHash))) return undefined;
  return publicUser(user);
}

/**
 * Elimina un usuario por su ID.
 * @param {number} id
 * @returns {User|undefined}
 */
export function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return undefined;

  return publicUser(users.splice(index, 1)[0]);
}
