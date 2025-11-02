"use server";
import { CartContext } from "@/Context/cartContext";
import getMyToken from "@/utilities/getMyToken";
import axios from "axios";
import { useContext } from "react";
import { toast } from "sonner";
import { CartProductType, CartType } from "./../types/cart.type";

export default async function addToCart(productId: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please Login to add Items");
  } else {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ productId: productId }),
        method: "POST",
      });

      const { data } = await res.json();
      console.log("Add to Cart res:", data);
      return data;
    } catch (e) {
      console.log("ERROR ", e);
    }
  }
}
