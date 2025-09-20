import getMyToken from "@/utilities/getMyToken";
import axios from "axios";

export default async function removeCartItem(productId: string) {
  const token = await getMyToken();
  let res = axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { headers: { token } }
  );
  return res;
}
