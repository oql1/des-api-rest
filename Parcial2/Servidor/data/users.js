export const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

let nextId = users.reduce((highestId, user) => Math.max(highestId, user.id), 0) + 1;

export function getUsers() {
  return users;
}

export function findUserById(id) {
  return users.find((user) => user.id === id);
}

export function createUser(name) {
  const user = { id: nextId++, name };
  users.push(user);
  return user;
}

export function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return undefined;

  return users.splice(index, 1)[0];
}
