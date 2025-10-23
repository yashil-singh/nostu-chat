"use server";

import { auth } from "@/lib/auth";

export const verifyEmail = async (email: string, otp: string) => {
  try {
    await auth.api.verifyEmailOTP({
      body: {
        email,
        otp,
      },
    });

    return {
      success: true,
      message: "Email verified successfully.",
    };
  } catch (error) {
    console.error("🚀 ~ verify-email.ts:5 ~ verifyEmail ~ error:", error);
    const e = error as Error & { statusCode: number };

    return {
      success: false,
      status: e.statusCode,
      message: e.message || "An unknown error occurred.",
    };
  }
};
