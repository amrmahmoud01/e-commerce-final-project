import NextAuth from "next-auth";
import {User} from "next-auth"

declare module "next-auth" {
  interface Session {
    user: User["user"];
  }

  interface User {
    user: {
      name: string;
      email: string;
      role: string;
    };
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    idToken?: string;
  }
}
