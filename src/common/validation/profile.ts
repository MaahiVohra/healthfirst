import * as z from "zod";

export const profileSchema = z.object({
  dob: z.any(),
  bloodgroup: z.string(),
  contact: z.string(),
  emergencyContact: z.string(),
  address: z.string(),
  userId: z.any(),
});

export type IProfile = z.infer<typeof profileSchema>;
