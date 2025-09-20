import * as z from "zod";

export const checkoutSchema = z.object({
  details: z.string().nonempty("this field can't be empty"),
  phone: z
    .string()
    .nonempty()
    .regex(/^01[1250][0-9]{8}$/, "Not valid phone number"),
  city: z.string().nonempty("City Can't be empty"),
});

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;
