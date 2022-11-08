import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";

import { prisma } from "./prisma";
import { loginSchema } from "./validation/auth";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials){
        try {
          const creds = await loginSchema.parseAsync(credentials);

          const result = await prisma.user.findFirst({
            where: { email: creds.email },
          });

          if (!result) return null;

          const isValidPassword = await verify(result.password, creds.password);

          if (!isValidPassword) return null;

          return result;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.username = user.username;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.username = token.username;
      }
   
      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",
    newUser: "/sign-up",
  },
  secret: "super-secret",
};
