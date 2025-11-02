"use server";

import { ForgetPasswordSchemaType } from "@/schema/forgetPassword.schema";

export async function forgotPassword(values:ForgetPasswordSchemaType) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: values.email }),
    }
  );
  return await res.json();
}
