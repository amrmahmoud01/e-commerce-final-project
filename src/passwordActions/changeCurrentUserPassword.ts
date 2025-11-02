import { changeCurrentUserPasswordSchemaType } from "@/schema/changeCurrentUserPassword.schema";
import getMyToken from "@/utilities/getMyToken";

export async function changeCurrentUserPassword(
  values: changeCurrentUserPasswordSchemaType
) {
  const token = await getMyToken();
  if (token) {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: { token, "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    return await res.json();
  }
}
