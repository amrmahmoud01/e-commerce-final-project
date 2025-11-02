"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function addToWishlist(id: string) {
  const token = await getMyToken();
  if (token) {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ productId: id }),
      }
    );
    return response.json();
  }
}
