import { serial, text, pgTable, timestamp, numeric, integer, boolean, pgEnum, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Position enum for employees
export const positionEnum = pgEnum('position', ['ART', 'Security', 'Driver', 'Gardener', 'Other']);

// Employees table
export const employeesTable = pgTable('employees', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address'), // Nullable by default
  phone_number: text('phone_number'), // Nullable by default
  date_of_birth: date('date_of_birth'), // Nullable by default
  start_date: date('start_date').notNull(),
  position: positionEnum('position').notNull(),
  monthly_salary: numeric('monthly_salary', { precision: 10, scale: 2 }).notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Attendance table
export const attendanceTable = pgTable('attendance', {
  id: serial('id').primaryKey(),
  employee_id: integer('employee_id').references(() => employeesTable.id).notNull(),
  date: date('date').notNull(),
  check_in_time: timestamp('check_in_time'), // Nullable by default
  check_out_time: timestamp('check_out_time'), // Nullable by default
  hours_worked: numeric('hours_worked', { precision: 4, scale: 2 }), // Nullable by default
  notes: text('notes'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull()
});

// Payroll table
export const payrollTable = pgTable('payroll', {
  id: serial('id').primaryKey(),
  employee_id: integer('employee_id').references(() => employeesTable.id).notNull(),
  month: integer('month').notNull(), // 1-12
  year: integer('year').notNull(),
  base_salary: numeric('base_salary', { precision: 10, scale: 2 }).notNull(),
  deductions: numeric('deductions', { precision: 10, scale: 2 }).default('0').notNull(),
  bonuses: numeric('bonuses', { precision: 10, scale: 2 }).default('0').notNull(),
  total_amount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  is_paid: boolean('is_paid').default(false).notNull(),
  paid_date: timestamp('paid_date'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull()
});

// Feature toggles table for enabling/disabling features
export const featureTogglesTable = pgTable('feature_toggles', {
  id: serial('id').primaryKey(),
  feature_name: text('feature_name').notNull().unique(),
  is_enabled: boolean('is_enabled').default(false).notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Relations
export const employeesRelations = relations(employeesTable, ({ many }) => ({
  attendance: many(attendanceTable),
  payroll: many(payrollTable)
}));

export const attendanceRelations = relations(attendanceTable, ({ one }) => ({
  employee: one(employeesTable, {
    fields: [attendanceTable.employee_id],
    references: [employeesTable.id]
  })
}));

export const payrollRelations = relations(payrollTable, ({ one }) => ({
  employee: one(employeesTable, {
    fields: [payrollTable.employee_id],
    references: [employeesTable.id]
  })
}));

// TypeScript types for the table schemas
export type Employee = typeof employeesTable.$inferSelect;
export type NewEmployee = typeof employeesTable.$inferInsert;
export type Attendance = typeof attendanceTable.$inferSelect;
export type NewAttendance = typeof attendanceTable.$inferInsert;
export type Payroll = typeof payrollTable.$inferSelect;
export type NewPayroll = typeof payrollTable.$inferInsert;
export type FeatureToggle = typeof featureTogglesTable.$inferSelect;
export type NewFeatureToggle = typeof featureTogglesTable.$inferInsert;

// Export all tables and relations for proper query building
export const tables = {
  employees: employeesTable,
  attendance: attendanceTable,
  payroll: payrollTable,
  featureToggles: featureTogglesTable
};