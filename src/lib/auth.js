import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { connectDB } from "@/lib/db";

let cachedAuth = null;

export async function getAuth() {
  if (!cachedAuth) {
    const conn = await connectDB();
    const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

    cachedAuth = betterAuth({
      baseURL,
      secret: process.env.BETTER_AUTH_SECRET || process.env.AUTH_SECRET,
      database: mongodbAdapter(conn.connection.db),
      emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
      },
      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      },
      user: {
        additionalFields: {
          role: {
            type: "string",
            required: true,
            defaultValue: "user",
            input: false,
          },
        },
      },
      trustedOrigins: [baseURL],
      plugins: [nextCookies()],
    });
  }
  return cachedAuth;
}