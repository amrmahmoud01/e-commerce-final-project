import { loginSchemaType } from "@/schema/login.schema";

export async function resetPassword(values: loginSchemaType) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        newPassword: values.password,
      }),
    }
  );
  return await res.json();
}
