"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import PasswordInput from "@/components/ui/password-input";
import { login } from "@/lib/actions/auth/login";
import {
  defaultLoginFormValues,
  LoginForm as LoginFormType,
  loginSchema,
} from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSignIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginFormValues,
  });

  const onSubmit = async (data: LoginFormType) => {
    const response = await login(data);
    if (response.success) {
      toast.success(response.message);
      redirect("/inbox");
    } else {
      if (response.status === 403) {
        redirect(`/verify?email=${data.email}`);
      } else {
        toast.error(response.message);
        form.setValue("password", "");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    placeholder="Email Address"
                    {...field}
                  />
                  <InputGroupAddon>
                    <AtSignIcon />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputGroup>
                  <PasswordInput
                    id="password"
                    placeholder="Password"
                    {...field}
                  >
                    <InputGroupAddon>
                      <LockIcon />
                    </InputGroupAddon>
                  </PasswordInput>
                </InputGroup>
              </FormControl>
              <div className="flex items-center justify-between">
                <FormMessage />
                <FormDescription className=" flex-1 text-right text-accent-foreground underline underline-offset-4">
                  <Link href="/forgot-password">Forgot password?</Link>
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          isLoading={form.formState.isSubmitting}
          loadingText="Logging in"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
