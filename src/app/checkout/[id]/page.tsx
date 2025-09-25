"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { checkoutSchema, checkoutSchemaType } from "@/schema/checkout.schema";
import onlineCheckOut from "@/checkoutActions/onlineCheckOut.action";
import createCashOrder from "@/checkoutActions/createCashOrder.action";

export default function Checkout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("");

  const { id }: { id: string } = useParams();
  console.log("ID:", id);
  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });
  async function handleCheckout(values: checkoutSchemaType) {
    console.log(values);

    if (payment === "online") {
      const url = process.env.NEXT_PUBLIC_URL || window.location.origin;

      console.log("url:", url);

      const res = await onlineCheckOut(id, url, values);

      console.log("RES", res);

      if (res.status === "success") {
        console.log("URL:", res.session.url);
        window.location.href = res.session.url;
      } else {
        console.log(res);
        toast.error("Something went wrong, please try again");
      }
    } else {
      const res = await createCashOrder(id, values);
      console.log(res);

      if (res.status === "success") {
        toast.success("Order Placed Successfully");
        router.push("/allorders");
      } else {
        toast.error("Something went wrong please try again");
      }
    }
  }
  return (
    <>
      <h1 className="text-center font-bold my-30 text-3xl">Checkout</h1>

      <div className=" w-1/2 mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCheckout)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Details:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Phone: </FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">City: </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={payment === "online"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Pay Online</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={payment === "cash"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            <Button
              className={`w-full cursor-pointer ${
                loading ? "disabled cursor-default" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {!loading ? "Pay now" : "Loading..."}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
