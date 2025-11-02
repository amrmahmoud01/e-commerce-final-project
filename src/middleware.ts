import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/cart", "/login", "/register", "/resetPassword","/verifyResetCode"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log(token);
  if (token) {
    console.log("YES TOEN");
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (request.nextUrl.pathname === "/cart") {
      return NextResponse.redirect(new URL("/login", request.url));
    // } else if (
    //   request.nextUrl.pathname === "/resetPassword" ||
    //   request.nextUrl.pathname === "/verifyResetCode"
    // ) {
    //   console.log("YES FORGOT PASSWORD")
    //   return NextResponse.redirect(new URL("/forgetPassword", request.url));
    } else {
      return NextResponse.next();
    }
  }
}
