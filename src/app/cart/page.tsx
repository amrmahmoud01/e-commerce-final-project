import { Metadata } from "next";
import clearCart from "@/cartActions/clearCart.action";
import getCart from "@/cartActions/getCart.action";
import removeCartItem from "@/cartActions/removeCartItem.action";
import updateItemQuantity from "@/cartActions/updateItemQuantity.action";
import { Button } from "@/components/ui/button";
import { CartContext, useCart } from "@/Context/cartContext";
import { CartProductType } from "@/types/cart.type";
import Link from "next/link";
import CartClient from "./CartClientComponent";

export const metadata: Metadata = {
  title: "Shopping Cart | FreshCart",
  description: "View and manage your shopping cart items",
};

export default function Cart() {
  return <CartClient />;
}
