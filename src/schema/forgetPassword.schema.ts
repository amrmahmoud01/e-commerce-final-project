import * as z from "zod";

export const forgetPasswordSchema = z.object({
  email: z.email().nonempty("this field can't be empty"),
});

export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>;
