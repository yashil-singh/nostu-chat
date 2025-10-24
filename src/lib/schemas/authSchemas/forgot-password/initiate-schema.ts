import z from "zod";

export const initiateForgotPasswordSchema = z.object({
  email: z
    .string("Invlaid email address.")
    .min(1, { message: "Email address is required." })
    .refine((email) => z.email().safeParse(email).success, {
      message: "Invalid email address.",
    }),
});

export type InitiateForgotPasswordForm = z.infer<
  typeof initiateForgotPasswordSchema
>;

export const defaultInitiateForgotPasswordFormValues: InitiateForgotPasswordForm =
  {
    email: "",
  };
