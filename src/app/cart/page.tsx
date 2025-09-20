"use client";
import clearCart from "@/cartActions/clearCart.action";
import getCart from "@/cartActions/getCart.action";
import removeCartItem from "@/cartActions/removeCartItem.action";
import updateItemQuantity from "@/cartActions/updateItemQuantity.action";
import { Button } from "@/components/ui/button";
import { CartContext, useCart } from "@/Context/cartContext";
import { CartProductType } from "@/types/cart.type";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const [loading, setloading] = useState(true);

  const [buttonProductId, setbuttonProductId] = useState("");

  const { cart, setCart } = useCart();

  const [buttonLoading, setbuttonLoading] = useState(false);

  const [removeLoading, setremoveLoading] = useState(false);

  const [totalCartPrice, settotalCartPrice] = useState(0);

  const [cartId, setcartId] = useState("");

  async function deleteCart() {
    let res = await clearCart();
    setCart([]);
    settotalCartPrice(res.data.data.totalCartPrice);
    console.log(res);
  }

  async function updateCartItemQuantity(productId: string, count: number) {
    setbuttonLoading(true);
    setbuttonProductId(productId);
    let res = await updateItemQuantity(productId, count);
    console.log(res.data.data.products);
    if (res.status === 200) {
      setCart(res.data.data.products);
      settotalCartPrice(res.data.data.totalCartPrice);
    }
    setbuttonLoading(false);
    return res;
  }

  async function getCartItems() {
    setloading(true);
    let res = await getCart();
    settotalCartPrice(res.data.data.totalCartPrice);
    console.log(res.data.data.totalCartPrice);
    setCart(res.data.data.products);
    setcartId(res.data.cartId)
    setloading(false);
  }

  async function deleteItem(productId: string) {
    setbuttonProductId(productId);
    setremoveLoading(true);
    let res = await removeCartItem(productId);
    console.log(res);

    if (res.status === 200) {
      setCart(res.data.data.products);
      toast.success("Product Removed Successfully", { position: "top-center" });
      settotalCartPrice(res.data.data.totalCartPrice);
    } else {
      toast.error("Couldn't remove product please try again", {
        position: "top-center",
      });
    }
    setremoveLoading(false);
  }

  useEffect(() => {
    getCartItems();
  }, []);

  if (loading)
    return (
      <h1 className="mx-auto text-center mt-30 font-bold text-3xl">
        LOADING CART...
      </h1>
    );

  return (
    <>
      <div className="container mt-30 w-4/5 mx-auto">
        {cart.length == 0 ? (
          <h1 className="text-center mb-5">NO ITEMS ADDED YET</h1>
        ) : (
          <div>
            <div className="flex justify-end w-full">
              <button
                onClick={() => deleteCart()}
                className="cursor-pointer text-red-500 font-bold mb-5 cursor pointer me-25"
              >
                Clear Cart
              </button>
            </div>
            <h1>Total Cart Price: {totalCartPrice}</h1>
          </div>
        )}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product: CartProductType) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={product.product._id}
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        onClick={() =>
                          updateCartItemQuantity(
                            product.product._id,
                            product.count - 1
                          )
                        }
                        disabled={product.count == 1 || buttonLoading}
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>

                      {buttonLoading &&
                      buttonProductId === product.product._id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <div>{product.count}</div>
                      )}

                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                        onClick={() =>
                          updateCartItemQuantity(
                            product.product._id,
                            product.count + 1
                          )
                        }
                        disabled={buttonLoading}
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    {removeLoading &&
                    buttonProductId === product.product._id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <button
                        className="font-medium text-red-600 dark:text-red-500 cursor-pointer disabled:cursor-default disabled:text-slate-400"
                        onClick={() => deleteItem(product.product._id)}
                        disabled={removeLoading || buttonLoading}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href={`/checkout/${cartId}`}>
            <Button className="mt-5 w-full">Checkout</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
