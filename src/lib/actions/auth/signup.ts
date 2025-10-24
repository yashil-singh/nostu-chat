"use server";

import { auth } from "@/lib/auth";
import { SignupForm } from "@/lib/schemas/authSchemas/signupSchema";

export const signup = async (data: SignupForm) => {
  try {
    const { name, email, password } = data;

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return {
      message: "Account created successfully.",
      success: true,
    };
  } catch (error) {
    console.error("🚀 ~ signup.ts:25 ~ signup ~ error:", error);

    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred.",
      success: false,
    };
  }
};
