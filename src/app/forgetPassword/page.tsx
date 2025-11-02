"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/passwordActions/forgotPassword";
import {
  forgetPasswordSchema,
  ForgetPasswordSchemaType,
} from "@/schema/forgetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()!;
  const form = useForm<ForgetPasswordSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
  });

  async function onSubmit(values: ForgetPasswordSchemaType) {
    setLoading(true);
    const res = await forgotPassword(values);
    if (res.statusMsg === "success") {
      toast.success(res.message);
      router.push("/verifyResetCode");
    } else {
      toast.error(res.message);
    }
    setLoading(false)
  }
  return (
    <>
      <div className=" w-1/2 mx-auto mt-52">
        <h1 className="text-3xl mb-12 text-center">
          Enter Email to reset password
        </h1>
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

            <Button
              className={`w-full cursor-pointer ${
                loading ? "disabled cursor-default" : ""
              }`}
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
