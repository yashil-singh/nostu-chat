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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  initiateForgotPassword,
  verifyForgotPasswordOtp,
} from "@/lib/actions/auth/password";
import {
  defaultVerifyForgotPasswordOtpFormValues,
  VerifyForgotPasswordOtpForm as VerifyForgotPasswordOtpFormType,
  verifyForgotPasswordOtpSchema,
} from "@/lib/schemas/authSchemas/forgot-password/verify-otp-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ResendOtpTimer from "./resend-otp-timer";

const VerifyForgotPasswordOtpForm = ({ email }: { email: string }) => {
  const form = useForm<VerifyForgotPasswordOtpFormType>({
    resolver: zodResolver(verifyForgotPasswordOtpSchema),
    defaultValues: defaultVerifyForgotPasswordOtpFormValues,
  });

  const onSubmit = async (data: VerifyForgotPasswordOtpFormType) => {
    const response = await verifyForgotPasswordOtp(email, data.otp);
    if (response.success) {
      toast.success(response.message);
      redirect("/forgot-password/reset");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                  <InputOTPGroup className="w-full">
                    <InputOTPSlot className="flex-1 h-14" index={0} />
                    <InputOTPSlot className="flex-1 h-14" index={1} />
                    <InputOTPSlot className="flex-1 h-14" index={2} />
                    <InputOTPSlot className="flex-1 h-14" index={3} />
                    <InputOTPSlot className="flex-1 h-14" index={4} />
                    <InputOTPSlot className="flex-1 h-14" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          isLoading={form.formState.isSubmitting}
          loadingText="Verifying OTP"
          className="w-full"
        >
          Verify OTP
        </Button>
      </form>

      <div className="flex">
        <Label className="mx-auto text-muted-foreground">
          Didn&apos;t receive OTP? <ResendOtpTimer email={email} />
        </Label>
      </div>
    </Form>
  );
};

export default VerifyForgotPasswordOtpForm;
