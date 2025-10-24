"use server";

import { auth } from "@/lib/auth";
import { LoginForm } from "@/lib/schemas/authSchemas/loginSchema";

export const login = async (data: LoginForm) => {
  try {
    const { email, password } = data;

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Login successful.",
    };
  } catch (error) {
    console.error("🚀 ~ login.ts:7 ~ login ~ error:", error);
    const e = error as Error & { statusCode: number };

    return {
      success: false,
      status: e.statusCode,
      message: e.message || "An unknown error occurred.",
    };
  }
};
