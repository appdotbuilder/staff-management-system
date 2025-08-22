import { z } from 'zod';

// Employee position enum
export const positionEnum = z.enum(['ART', 'Security', 'Driver', 'Gardener', 'Other']);
export type Position = z.infer<typeof positionEnum>;

// Employee schema
export const employeeSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string().nullable(),
  phone_number: z.string().nullable(),
  date_of_birth: z.coerce.date().nullable(),
  start_date: z.coerce.date(),
  position: positionEnum,
  monthly_salary: z.number(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Employee = z.infer<typeof employeeSchema>;

// Input schema for creating employees
export const createEmployeeInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().nullable().optional(),
  phone_number: z.string().nullable().optional(),
  date_of_birth: z.coerce.date().nullable().optional(),
  start_date: z.coerce.date(),
  position: positionEnum,
  monthly_salary: z.number().positive("Monthly salary must be positive"),
  is_active: z.boolean().default(true)
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeInputSchema>;

// Input schema for updating employees
export const updateEmployeeInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required").optional(),
  address: z.string().nullable().optional(),
  phone_number: z.string().nullable().optional(),
  date_of_birth: z.coerce.date().nullable().optional(),
  start_date: z.coerce.date().optional(),
  position: positionEnum.optional(),
  monthly_salary: z.number().positive("Monthly salary must be positive").optional(),
  is_active: z.boolean().optional()
});

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeInputSchema>;

// Attendance schema
export const attendanceSchema = z.object({
  id: z.number(),
  employee_id: z.number(),
  date: z.coerce.date(),
  check_in_time: z.coerce.date().nullable(),
  check_out_time: z.coerce.date().nullable(),
  hours_worked: z.number().nullable(),
  notes: z.string().nullable(),
  created_at: z.coerce.date()
});

export type Attendance = z.infer<typeof attendanceSchema>;

// Input schema for creating attendance records
export const createAttendanceInputSchema = z.object({
  employee_id: z.number(),
  date: z.coerce.date(),
  check_in_time: z.coerce.date().nullable().optional(),
  check_out_time: z.coerce.date().nullable().optional(),
  notes: z.string().nullable().optional()
});

export type CreateAttendanceInput = z.infer<typeof createAttendanceInputSchema>;

// Input schema for updating attendance records
export const updateAttendanceInputSchema = z.object({
  id: z.number(),
  check_in_time: z.coerce.date().nullable().optional(),
  check_out_time: z.coerce.date().nullable().optional(),
  notes: z.string().nullable().optional()
});

export type UpdateAttendanceInput = z.infer<typeof updateAttendanceInputSchema>;

// Payroll schema
export const payrollSchema = z.object({
  id: z.number(),
  employee_id: z.number(),
  month: z.number().int().min(1).max(12),
  year: z.number().int(),
  base_salary: z.number(),
  deductions: z.number(),
  bonuses: z.number(),
  total_amount: z.number(),
  is_paid: z.boolean(),
  paid_date: z.coerce.date().nullable(),
  created_at: z.coerce.date()
});

export type Payroll = z.infer<typeof payrollSchema>;

// Input schema for creating payroll records
export const createPayrollInputSchema = z.object({
  employee_id: z.number(),
  month: z.number().int().min(1).max(12),
  year: z.number().int(),
  base_salary: z.number().positive(),
  deductions: z.number().min(0).default(0),
  bonuses: z.number().min(0).default(0)
});

export type CreatePayrollInput = z.infer<typeof createPayrollInputSchema>;

// Input schema for updating payroll records
export const updatePayrollInputSchema = z.object({
  id: z.number(),
  deductions: z.number().min(0).optional(),
  bonuses: z.number().min(0).optional(),
  is_paid: z.boolean().optional(),
  paid_date: z.coerce.date().nullable().optional()
});

export type UpdatePayrollInput = z.infer<typeof updatePayrollInputSchema>;

// Feature toggle schema
export const featureToggleSchema = z.object({
  id: z.number(),
  feature_name: z.string(),
  is_enabled: z.boolean(),
  updated_at: z.coerce.date()
});

export type FeatureToggle = z.infer<typeof featureToggleSchema>;

// Input schema for updating feature toggles
export const updateFeatureToggleInputSchema = z.object({
  feature_name: z.string(),
  is_enabled: z.boolean()
});

export type UpdateFeatureToggleInput = z.infer<typeof updateFeatureToggleInputSchema>;

// Query input schemas
export const getEmployeeByIdInputSchema = z.object({
  id: z.number()
});

export const getAttendanceByEmployeeInputSchema = z.object({
  employee_id: z.number(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional()
});

export const getPayrollByEmployeeInputSchema = z.object({
  employee_id: z.number(),
  month: z.number().int().min(1).max(12).optional(),
  year: z.number().int().optional()
});

export const deleteEmployeeInputSchema = z.object({
  id: z.number()
});

export const deleteAttendanceInputSchema = z.object({
  id: z.number()
});

export type GetEmployeeByIdInput = z.infer<typeof getEmployeeByIdInputSchema>;
export type GetAttendanceByEmployeeInput = z.infer<typeof getAttendanceByEmployeeInputSchema>;
export type GetPayrollByEmployeeInput = z.infer<typeof getPayrollByEmployeeInputSchema>;
export type DeleteEmployeeInput = z.infer<typeof deleteEmployeeInputSchema>;
export type DeleteAttendanceInput = z.infer<typeof deleteAttendanceInputSchema>;