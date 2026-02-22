import z from "zod";

export const signUpSchema = z
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

    gender: z.enum(["male", "female"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
