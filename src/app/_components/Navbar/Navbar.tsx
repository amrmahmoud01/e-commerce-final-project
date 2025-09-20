"use client";
import { CartContext } from "@/Context/cartContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  function logOut() {
    signOut({ redirect: false });
  }
  let { cartNumItems } = useContext(CartContext);
  return (
    <nav className="bg-emerald-600 text-white fixed top-0 w-full z-10000">
      <div className="container w-full lg:w-[80%] mx-auto p-4 flex flex-col gap-4 lg:flex-row lg:justify-between justify-between items-center">
        <div>
          <ul className="flex gap-2 lg:gap-6 items-center">
            <li className="font-bold flex lg:text-xl">
              <Link href="/">
                <i className="fa-solid fa-cart-shopping"></i>Freshcart
              </Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
            {session && (
              <li>
                <Link className="relative" href="/cart">
                  Cart
                  <span className="absolute top-[-10px] text-sm bg-yellow-200 size-5 text-center text-black rounded-full">
                    {cartNumItems}
                  </span>
                </Link>
              </li>
            )}
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/brands">Brands</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-8">
            <li>
              <i className="fab fa-facebook"></i>
            </li>
            <li>
              <i className="fab fa-twitter"></i>
            </li>
            <li>
              <i className="fab fa-instagram"></i>
            </li>
            <li>
              <i className="fab fa-tiktok"></i>
            </li>
            <li>
              <i className="fab fa-linkedin"></i>
            </li>
            {!session && (
              <li>
                {" "}
                <Link href="/register">Register</Link>
              </li>
            )}
            {!session && (
              <li>
                {" "}
                <Link href="/login">Login</Link>
              </li>
            )}
            {session && <li>Hi {session.user.name}</li>}

            {session && (
              <li>
                <span onClick={logOut} className="cursor-pointer">
                  Signout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
