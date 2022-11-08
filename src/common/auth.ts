import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verify } from "argon2";
import { prisma } from "./prisma";
// import { loginSchema } from "./validation/auth";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        const valid = await verify(user.password, credentials.password);
        if (user && valid) {
          return { ...user, email: user.email };
        } else {
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
