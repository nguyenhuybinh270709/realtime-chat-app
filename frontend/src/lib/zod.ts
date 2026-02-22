import type z from "zod";

export function mapZodErrors<T>(issues: z.core.$ZodIssue[]) {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const issue of issues) {
    const field = issue.path?.[0];

    if (typeof field === "string" && !errors[field as keyof T]) {
      errors[field as keyof T] = issue.message;
    }
  }

  return errors;
}
