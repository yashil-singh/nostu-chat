"use client";

import { signup } from "@/lib/actions/auth/signup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import {
  defaultSignupFormValues,
  SignupForm as SignupFormType,
  signupSchema,
} from "@/lib/schemas/authSchemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSignIcon, LockIcon, UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignupForm = () => {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultSignupFormValues,
  });

  const onSubmit = async (data: SignupFormType) => {
    const response = await signup(data);
    if (response.success) {
      toast.success(response.message);
      redirect(`/verify?email=${data.email}`);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    id="name"
                    placeholder="Name"
                    {...field}
                    autoCapitalize="words"
                  />
                  <InputGroupAddon>
                    <UserIcon />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputGroup>
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    {...field}
                  >
                    <InputGroupAddon>
                      <LockIcon />
                    </InputGroupAddon>
                  </PasswordInput>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          type="submit"
          isLoading={form.formState.isSubmitting}
          loadingText="Signing up"
        >
          Signup
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
