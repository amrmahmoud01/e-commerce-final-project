import getMyToken from "@/utilities/getMyToken";

export default async function removeItemFromWishlist(id: string) {
  const token = await getMyToken();
  if (token) {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        method: "DELETE",
        headers: { token, "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  }
}
