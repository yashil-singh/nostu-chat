import { db } from "@/db";
import { schema } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  // databaase
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  // email and password
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url, token }) => {
      console.log("🚀 ~ index.ts:19 ~ token:", token);

      console.log("🚀 ~ index.ts:19 ~ url:", url);

      console.log("🚀 ~ index.ts:19 ~ user:", user);

      // TODO: Send the reset password email to the user
    },
    onPasswordReset: async ({ user }) => {
      console.log("🚀 ~ index.ts:28 ~ user:", user);

      // TODO: Handle the password reset
    },
  },

  emailVerification: {
    autoSignInAfterVerification: true,
  },

  // social providers
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   },

  //   facebook: {
  //     clientId: process.env.FACEBOOK_CLIENT_ID as string,
  //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
  //   },
  // },
  // plugins
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        console.log("🚀 ~ index.ts:37 ~ type:", type);

        console.log("🚀 ~ index.ts:37 ~ otp:", otp);

        console.log("🚀 ~ index.ts:37 ~ email:", email);

        if (type === "forget-password") {
          // TODO: Send the forget password email to the user
        }

        if (type === "email-verification") {
          // TODO: Send the verification code to the user's email
        }
      },
    }),
    nextCookies(),
  ],
});
