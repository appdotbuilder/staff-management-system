import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schema types
import {
  createEmployeeInputSchema,
  getEmployeeByIdInputSchema,
  updateEmployeeInputSchema,
  deleteEmployeeInputSchema,
  createAttendanceInputSchema,
  getAttendanceByEmployeeInputSchema,
  updateAttendanceInputSchema,
  deleteAttendanceInputSchema,
  createPayrollInputSchema,
  getPayrollByEmployeeInputSchema,
  updatePayrollInputSchema,
  updateFeatureToggleInputSchema
} from './schema';

// Import handlers
import { createEmployee } from './handlers/create_employee';
import { getEmployees } from './handlers/get_employees';
import { getEmployeeById } from './handlers/get_employee_by_id';
import { updateEmployee } from './handlers/update_employee';
import { deleteEmployee } from './handlers/delete_employee';
import { createAttendance } from './handlers/create_attendance';
import { getAttendanceByEmployee } from './handlers/get_attendance_by_employee';
import { updateAttendance } from './handlers/update_attendance';
import { deleteAttendance } from './handlers/delete_attendance';
import { createPayroll } from './handlers/create_payroll';
import { getPayrollByEmployee } from './handlers/get_payroll_by_employee';
import { updatePayroll } from './handlers/update_payroll';
import { getFeatureToggles } from './handlers/get_feature_toggles';
import { updateFeatureToggle } from './handlers/update_feature_toggle';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check endpoint
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Employee management routes
  createEmployee: publicProcedure
    .input(createEmployeeInputSchema)
    .mutation(({ input }) => createEmployee(input)),

  getEmployees: publicProcedure
    .query(() => getEmployees()),

  getEmployeeById: publicProcedure
    .input(getEmployeeByIdInputSchema)
    .query(({ input }) => getEmployeeById(input)),

  updateEmployee: publicProcedure
    .input(updateEmployeeInputSchema)
    .mutation(({ input }) => updateEmployee(input)),

  deleteEmployee: publicProcedure
    .input(deleteEmployeeInputSchema)
    .mutation(({ input }) => deleteEmployee(input)),

  // Attendance management routes
  createAttendance: publicProcedure
    .input(createAttendanceInputSchema)
    .mutation(({ input }) => createAttendance(input)),

  getAttendanceByEmployee: publicProcedure
    .input(getAttendanceByEmployeeInputSchema)
    .query(({ input }) => getAttendanceByEmployee(input)),

  updateAttendance: publicProcedure
    .input(updateAttendanceInputSchema)
    .mutation(({ input }) => updateAttendance(input)),

  deleteAttendance: publicProcedure
    .input(deleteAttendanceInputSchema)
    .mutation(({ input }) => deleteAttendance(input)),

  // Payroll management routes
  createPayroll: publicProcedure
    .input(createPayrollInputSchema)
    .mutation(({ input }) => createPayroll(input)),

  getPayrollByEmployee: publicProcedure
    .input(getPayrollByEmployeeInputSchema)
    .query(({ input }) => getPayrollByEmployee(input)),

  updatePayroll: publicProcedure
    .input(updatePayrollInputSchema)
    .mutation(({ input }) => updatePayroll(input)),

  // Feature toggle routes
  getFeatureToggles: publicProcedure
    .query(() => getFeatureToggles()),

  updateFeatureToggle: publicProcedure
    .input(updateFeatureToggleInputSchema)
    .mutation(({ input }) => updateFeatureToggle(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();