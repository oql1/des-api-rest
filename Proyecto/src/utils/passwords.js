import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const deriveKey = promisify(scrypt);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = await deriveKey(password, salt, 64);
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password, passwordHash) {
  const [salt, storedHash] = passwordHash.split(":");
  const expected = Buffer.from(storedHash, "hex");
  const actual = await deriveKey(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
