import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .refine((email) => z.email().safeParse(email).success, {
      message: "Invalid email address.",
    }),
  password: z.string().min(1, { message: "Password is required." }),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const defaultLoginFormValues: LoginForm = {
  email: "",
  password: "",
};
