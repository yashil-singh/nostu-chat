import z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z
      .string("Invalid email address.")
      .min(1, { message: "Email is required." })
      .refine((email) => z.email().safeParse(email).success, {
        message: "Invalid email address.",
      }),
    password: z
      .string("Invalid password.")
      .min(1, { message: "Password is required." }),
    confirmPassword: z
      .string("Invalid password.")
      .min(1, { message: "Password confirmation is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupForm = z.infer<typeof signupSchema>;

export const defaultSignupFormValues: SignupForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
