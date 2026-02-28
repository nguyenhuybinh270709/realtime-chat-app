import z from "zod";

export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Display name must be between 2 and 20 characters.")
    .max(20, "Display name must be between 2 and 20 characters."),

  bio: z.string().trim().max(200, "Bio is limited to 200 characters"),
});
