"use server";

import { decode, getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyId() {
  try {
    const cookie = await cookies();
    const encryptedToken =
      cookie.get("next-auth.session-token")?.value ||
      cookie.get("__Secure-next-auth.session-token")?.value;

    if (!encryptedToken) {
      return null;
    }
    const token = await decode({
      token: encryptedToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return token?.sub;
  } catch (error) {
    return error;
  }
}
