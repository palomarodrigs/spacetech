import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { prismaClient } from "./prisma";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "user",
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const customUser = user as unknown as any;

      if (user) {
        return {
          ...token,
          role: customUser.role,
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.sub || null,
          name: token.name,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
};
