import { CartContext } from "@/Context/cartContext";
import getMyToken from "@/utilities/getMyToken";
import axios from "axios";
import { useContext } from "react";
import { toast } from "sonner";
import { CartProductType, CartType } from "./../types/cart.type";

export default async function addToCart(
  productId: string
): Promise<{ data: { data: { products: CartProductType[] } } }> {
  const token = await getMyToken();
  if (!token) {
    toast.error("Please login to add items to cart");
    throw new Error("Please Login to add Items");
  } else {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token,
          },
        }
      );

      toast.success("Item added successfully");
      return res;
    } catch (error) {
      throw new Error("something went wrong");
    }
  }
}
