"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function getCart() {
  const token = await getMyToken();

  if (token) {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token },
    });
    const {data} = await res.json();
    console.log("Respinse: ", data);
    return data;
  } else {
    throw new Error("Something went wrong");
  }
}
