import getMyToken from "@/utilities/getMyToken";
import axios from "axios";

export default async function updateItemQuantity(
  productId: string,
  count: number
) {
  const token = await getMyToken();

  const res = axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count },
    { headers: { token } }
  );
  return res;
}
