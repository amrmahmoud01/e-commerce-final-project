"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/passwordActions/resetPassword";
import { loginSchema, loginSchemaType } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPassword() {
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
    try {
      const res = await resetPassword(values);

      toast.success("Password reset successfully! You can now log in.");

      // ✅ clear the verification flag once done
      sessionStorage.removeItem("otpVerified");

      router.push("/login");
    } catch (e) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Redirect if not verified
  useEffect(() => {
    const verified = sessionStorage.getItem("otpVerified");
    if (!verified) {
      router.push("/forgetPassword");
    }
  }, [router]);

  return (
    <>
      <h1 className="text-center font-bold my-20 text-3xl">Reset Password</h1>

      <div className="w-1/2 mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email:</FormLabel>
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
                  <FormLabel className="font-semibold">
                    New Password:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className={`w-full ${loading ? "cursor-default opacity-70" : ""}`}
              type="submit"
              disabled={loading}
            >
              {!loading ? "Reset Password" : "Loading..."}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
