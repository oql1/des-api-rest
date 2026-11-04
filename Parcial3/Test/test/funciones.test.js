import assert from "node:assert";
import test from "node:test";
import { sumar } from "../src/funciones.js";

test("Debe regresar 10 al sumar 5 + 5", () => {
  const a = 5;
  const b = 5;
  const suma = sumar(a, b);

  assert.equal(suma, 10);
});
