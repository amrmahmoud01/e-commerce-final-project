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
import { useRouter } from "next/navigation";
import { loginSchema, loginSchemaType } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import error from "./../products/error";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  async function onSubmit(values: loginSchemaType) {
    setLoading(true);
    console.log("LOGGING");
    
    let response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    console.log(response);
    if (response?.ok) {
      setLoading(false);
      toast.success("Login Successful", {
        position: "top-center",
        duration: 3000,
      });

      window.location.href = "/";
    } else {
      setLoading(false);
      toast.error(response?.error, { position: "top-center", duration: 3000 });
    }
  }
  return (
    <>
      <h1 className="text-center font-bold my-20 text-3xl">Freshcart Login</h1>

      <div className=" w-1/2 mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email: </FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="font-semibold">Password: </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className={`w-full cursor-pointer ${loading ? "disabled cursor-default" : ""}`}
              type="submit"
              disabled={loading}
            >
              {!loading ? "Login" : "Loading..."}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
