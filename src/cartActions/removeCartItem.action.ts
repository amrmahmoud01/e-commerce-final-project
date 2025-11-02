"use server";
import getMyToken from "@/utilities/getMyToken";
import axios from "axios";

export default async function removeCartItem(productId: string) {
  const token = await getMyToken();
  if (token) {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );
    const { data } = await res.json();
    console.log("DELETE DATA: ", data);
    return data;
  }
}
