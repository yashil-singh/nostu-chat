"use client";

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
import { initiateForgotPassword } from "@/lib/actions/auth/password";
import {
  defaultInitiateForgotPasswordFormValues,
  InitiateForgotPasswordForm as InitiateForgotPasswordFormType,
  initiateForgotPasswordSchema,
} from "@/lib/schemas/authSchemas/forgot-password/initiate-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSignIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const InitiateForgotPasswordForm = () => {
  const form = useForm<InitiateForgotPasswordFormType>({
    resolver: zodResolver(initiateForgotPasswordSchema),
    defaultValues: defaultInitiateForgotPasswordFormValues,
  });

  const onSubmit = async (data: InitiateForgotPasswordFormType) => {
    const response = await initiateForgotPassword(data.email);
    if (response.success) {
      toast.success(response.message);
      redirect(`/forgot-password/verify-otp?email=${data.email}`);
    } else {
      toast.error(response.message);
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
        <Button
          type="submit"
          isLoading={form.formState.isSubmitting}
          loadingText="Sending OTP"
          className="w-full"
        >
          Send OTP
        </Button>
      </form>
    </Form>
  );
};

export default InitiateForgotPasswordForm;
