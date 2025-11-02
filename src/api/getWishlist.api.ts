"use server"
import getMyToken from "@/utilities/getMyToken";
export default async function getWishlist() {
  const token = await getMyToken();
  if (token) {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: { token },
      }
    );
    const data = await response.json();
    return data;
  }
}
