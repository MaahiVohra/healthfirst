import { initTRPC, TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { v4 as uuid } from "uuid";
import type { IContext } from "./context";
import { signUpSchema } from "../common/validation/auth";

const t = initTRPC.context<IContext>().create();

export const serverRouter = t.router({
  signup: t.procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    const { username, email, password } = input;

    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (exists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const hashedPassword = await hash(password);
    const userId = uuid();
    const result = await ctx.prisma.user.create({
      data: { id: userId, username, email, password: hashedPassword },
    });

    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    };
  }),
});

export type IServerRouter = typeof serverRouter;
