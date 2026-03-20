import { z } from "zod";

export const updateProfileInputSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Display name must be between 2 and 20 characters.")
    .max(20, "Display name must be between 2 and 20 characters."),
  bio: z.string().trim().max(200, "Bio is limited to 200 characters"),
});
export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;
