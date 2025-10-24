import { REGEXP_ONLY_DIGITS } from "input-otp";
import z from "zod";

export const verifyForgotPasswordOtpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "OTP must be 6 digits." })
    .max(6, { message: "OTP must be 6 digits." })
    .refine((otp) => new RegExp(REGEXP_ONLY_DIGITS).test(otp), {
      message: "OTP must contain only digits.",
    }),
});

export type VerifyForgotPasswordOtpForm = z.infer<
  typeof verifyForgotPasswordOtpSchema
>;

export const defaultVerifyForgotPasswordOtpFormValues: VerifyForgotPasswordOtpForm =
  {
    otp: "",
  };
