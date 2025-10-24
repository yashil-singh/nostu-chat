"use server";

import { auth } from "@/lib/auth";

export const initiateForgotPassword = async (email: string) => {
  try {
    const response = await auth.api.forgetPasswordEmailOTP({
      body: {
        email,
      },
    });
    console.log(
      "🚀 ~ forgot-password.ts:13 ~ initiateForgotPassword ~ response:",
      response
    );

    if (!response.success) {
      throw new Error("Failed to send reset password OTP.");
    }

    return {
      success: response.success,
      message: `Verification code sent to ${email}.`,
    };
  } catch (error) {
    console.error("🚀 ~ forgot-password.ts:7 ~ forgotPassword ~ error:", error);
    const e = error as Error & { statusCode: number };

    return {
      success: false,
      status: e.statusCode,
      message: e.message || "An unknown error occurred.",
    };
  }
};

export const verifyForgotPasswordOtp = async (email: string, otp: string) => {
  try {
    const response = await auth.api.checkVerificationOTP({
      body: {
        email,
        otp,
        type: "forget-password",
      },
    });
    console.log(
      "🚀 ~ forgot-password.ts:42 ~ verifyForgotPasswordOtp ~ response:",
      response
    );

    if (!response.success) {
      throw new Error("Invalid reset password OTP.");
    }

    return {
      success: response.success,
      message: "Reset password OTP verified successfully.",
    };
  } catch (error) {
    console.error(
      "🚀 ~ forgot-password.ts:36 ~ verifyForgotPasswordOtp ~ error:",
      error
    );

    const e = error as Error & { statusCode: number };

    return {
      success: false,
      status: e.statusCode,
      message: e.message || "An unknown error occurred.",
    };
  }
};

export const resetPassword = async (
  email: string,
  otp: string,
  password: string
) => {
  try {
    const response = await auth.api.resetPasswordEmailOTP({
      body: {
        email,
        otp,
        password,
      },
    });

    if (!response.success) {
      throw new Error("Failed to reset password.");
    }

    return {
      success: response.success,
      message: "Password reset successfully.",
    };
  } catch (error) {
    const e = error as Error & { statusCode: number };
    return {
      success: false,
      status: e.statusCode,
      message: e.message || "An unknown error occurred.",
    };
  }
};

export const resendForgotPasswordOTP = async (email: string) => {
  try {
    const response = await auth.api.forgetPasswordEmailOTP({
      body: {
        email,
      },
    });

    if (!response.success) {
      throw new Error("Failed to send reset password OTP.");
    }

    return {
      success: response.success,
      message: `Verification code sent to ${email}.`,
    };
  } catch (error) {
    const e = error as Error & { statusCode: number };
    return {
      success: false,
      status: e.statusCode,
      message: e.message || "An unknown error occurred.",
    };
  }
};
