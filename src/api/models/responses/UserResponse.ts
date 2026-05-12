import { z } from 'zod';

export const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  website: z.string(),
});

export const CreateUserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.string(),
});

export const UpdateUserResponseSchema = z.object({
  name: z.string(),
  job: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;
export type UpdateUserResponse = z.infer<typeof UpdateUserResponseSchema>;
