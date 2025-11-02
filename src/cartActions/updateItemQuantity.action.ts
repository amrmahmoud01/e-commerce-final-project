"use server";
import getMyToken from "@/utilities/getMyToken";
import axios from "axios";

export default async function updateItemQuantity(
  productId: string,
  count: number
) {
  const token = await getMyToken();
  if (token) {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ count: count }),
        method: "PUT",
      }
    );
    const { data } = await res.json();
    return data;
  }
}
