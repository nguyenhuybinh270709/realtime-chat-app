import { z } from "zod";
import { genderEnum } from "./user.enum";

export const userDtoSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  displayName: z.string(),
  gender: genderEnum,
  profileImage: z.string().nullable(),
  bio: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type UserDTO = z.infer<typeof userDtoSchema>;
