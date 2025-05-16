import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const beautyRegistrations = pgTable("beauty_registrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  mobile: text("mobile").notNull(),
  birthdate: text("birthdate").notNull(),
  reason: text("reason").notNull(),
  selected: boolean("selected").default(false),
  rejected: boolean("rejected").default(false),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBeautyRegistrationSchema = createInsertSchema(beautyRegistrations).pick({
  name: true,
  mobile: true,
  birthdate: true,
  reason: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBeautyRegistration = z.infer<typeof insertBeautyRegistrationSchema>;
export type BeautyRegistration = typeof beautyRegistrations.$inferSelect;

// Extended schema with validation for the form
export const beautyRegistrationFormSchema = insertBeautyRegistrationSchema.extend({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  mobile: z.string().regex(/^[0-9]{9}$/, { message: "Introduza um número válido com 9 dígitos" }),
  birthdate: z.string().min(10, { message: "Por favor, introduza uma data de nascimento válida" }),
  reason: z.string().min(10, { message: "Por favor, explique porque merece ganhar esta sessão" }),
  acceptTerms: z.boolean().refine(value => value === true, {
    message: "Você precisa aceitar os termos e condições para participar"
  })
});
