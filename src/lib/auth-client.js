import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000/api/auth",
  plugins: [nextCookies()],
});

export const { signIn, signUp, signOut, useSession, getSession, forgetPassword, resetPassword } =
  authClient;