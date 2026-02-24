import z from "zod";

const usernameSchema = z
  .string()
  .trim()
  .min(2, "Username must be between 2 and 20 characters.")
  .max(20, "Username must be between 2 and 20 characters.");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters.");

export const signUpSchema = z
  .object({
    username: usernameSchema,

    displayName: z
      .string()
      .trim()
      .min(2, "Display name must be between 2 and 20 characters.")
      .max(20, "Display name must be between 2 and 20 characters."),

    password: passwordSchema,

    confirmPassword: z.string(),

    gender: z.enum(["male", "female"], {
      error: "Please select a valid gender",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});
