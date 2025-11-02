"use client";
import { CartContext } from "@/Context/cartContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import getMyToken from "@/utilities/getMyToken";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string } from "zod";
import {
  changeCurrentUserPasswordSchema,
  changeCurrentUserPasswordSchemaType,
} from "@/schema/changeCurrentUserPassword.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { changeCurrentUserPassword } from "@/passwordActions/changeCurrentUserPassword";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session, status } = useSession();
  console.log("NAVBER");
  const form = useForm({
    defaultValues: {
      password: "",
      rePassword: "",
      currentPassword: "",
    },
    resolver: zodResolver(changeCurrentUserPasswordSchema),
  });
  function logOut() {
    signOut({ redirect: true, callbackUrl: "/" });
  }

  async function onSubmit(values: changeCurrentUserPasswordSchemaType) {
    console.log("Submitting values:", values);
    const res = await changeCurrentUserPassword(values);
    if (res.message === "fail") {
      toast.error(res.errors.msg);
    } else {
      toast.success("Password Changed please login again");
      logOut();
    }
    console.log("Response:", res);
  }

  async function logToken() {
    const token = await getMyToken();
    console.log(token);
  }

  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Context undefined");
  }

  const { cartNumItems } = context;
  return (
    <nav className="bg-emerald-600 text-white fixed top-0 w-full z-5">
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
            {session && (
              <li>
                <Link href="/wishlist">Wishlist</Link>
              </li>
            )}
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
            <Dialog>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  {session && (
                    <li className="cursor-pointer">Hi {session.user.name}</li>
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-40 z-50" align="end">
                  <DropdownMenuLabel>Profile Actions</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <Link href="/allorders">
                      <DropdownMenuItem>View Orders</DropdownMenuItem>
                    </Link>
                    <DialogTrigger asChild>
                      <DropdownMenuItem>Change Password</DropdownMenuItem>
                    </DialogTrigger>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* ✅ the Form must be INSIDE the DialogContent */}
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your old and new password
                  </DialogDescription>
                </DialogHeader>

                {/* ✅ make sure this Form wraps your <form> tag */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rePassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm new Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" type="button">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

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
