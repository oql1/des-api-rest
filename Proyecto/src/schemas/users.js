import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(8).max(128),
  age: z.number().int().min(0).max(120),
  phone: z.string().trim().regex(/^\+?[0-9]{7,15}$/).optional(),
}).strict();
