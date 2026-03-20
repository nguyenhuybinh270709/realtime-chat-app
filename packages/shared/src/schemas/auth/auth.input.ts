import { z } from "zod";

export const signUpInputSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, "Username must be between 2 and 20 characters.")
      .max(20, "Username must be between 2 and 20 characters."),
    displayName: z
      .string()
      .trim()
      .min(2, "Display name must be between 2 and 20 characters.")
      .max(20, "Display name must be between 2 and 20 characters."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female"], {
      error: "Please select a valid gender",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type SignUpInput = z.infer<typeof signUpInputSchema>;

export const loginInputSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginInputSchema>;
