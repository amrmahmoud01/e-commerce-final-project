import * as z from "zod";

export const changeCurrentUserPasswordSchema = z
  .object({
    currentPassword:z.string().nonempty(),
    password: z
      .string()
      .nonempty()
      .min(6, "Password must be at least 6 characters"),
    rePassword: z.string().nonempty("this field can't be empty"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Passwords must match",
  });

export type changeCurrentUserPasswordSchemaType = z.infer<
  typeof changeCurrentUserPasswordSchema
>;
