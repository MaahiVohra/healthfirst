import { initTRPC, TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { v4 as uuid } from "uuid";
import type { IContext } from "./context";
import { signUpSchema } from "../common/validation/auth";
import { profileSchema } from "../common/validation/profile";

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
      userId: result.id,
      email: result.email,
      password: result.password,
    };
  }),
  updateprofile: t.procedure
    .input(profileSchema)
    .mutation(async ({ input, ctx }) => {
      const { dob, bloodgroup, contact, emergencyContact, address, userId } =
        input;
      const user = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          profile: {
            create: {
              dob: dob,
              bloodgroup: bloodgroup,
              contact: contact,
              emergencyContact: emergencyContact,
              address: address,
            },
            update: {
              dob: dob,
              bloodgroup: bloodgroup,
              contact: contact,
              emergencyContact: emergencyContact,
              address: address,
            },
          },
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: user.email,
      };
    }),
  getTreatments: t.procedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.userId },
      select: {
        treatments: true,
      },
    });
    return {
      status: 200,
      treatments: user.treatments,
    };
  }),
});

export type IServerRouter = typeof serverRouter;
