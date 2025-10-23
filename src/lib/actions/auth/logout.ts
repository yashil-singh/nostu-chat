"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const logout = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
      message: "Logout successful.",
    };
  } catch (error) {
    console.error("🚀 ~ logout.ts:5 ~ logout ~ error:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred.",
    };
  }
};
