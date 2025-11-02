"use server"
import getMyToken from "@/utilities/getMyToken";
import axios from "axios";

export default async function clearCart() {
  const token = await getMyToken();

  const res = axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token,
    },
  });
  return res;
}
