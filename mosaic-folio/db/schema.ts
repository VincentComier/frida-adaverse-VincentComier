import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

// Table des projets Ada (types de projets officiels)
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: integer('name').notNull(),
});

// Table des étudiants
export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  gitUsername: text('git_username').notNull(),
});

// Table des détails de projets
export const projectsDetails = pgTable('projects-details', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  github: text('github').notNull(),
  demolink: text('demolink').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  gitUsernameId: integer('git_username_id').notNull().references(() => students.id),
  projectId: integer('project_id').notNull().references(() => projects.id),
});
