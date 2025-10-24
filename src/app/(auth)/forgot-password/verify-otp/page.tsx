import VerifyForgotPasswordOtpForm from "@/components/forms/auth/forgot-password/verify-otp";
import ResendOtpTimer from "@/components/resend-otp-timer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { resendForgotPasswordOTP } from "@/lib/actions/auth/password";
import { Key } from "lucide-react";
import { redirect } from "next/navigation";

const ForgotPasswordVerifyOtpPage = async ({
  searchParams,
}: {
  searchParams: { email: string };
}) => {
  const { email } = await searchParams;

  if (!email) {
    redirect("/forgot-password");
  }

  return (
    <>
      <Card className="w-full max-w-md px-4 gap-6">
        <CardHeader>
          <span className="bg-primary p-4 mx-auto shrink-0 rounded-2xl shadow-xl w-fit mt-5 mb-3">
            <Key className="text-primary-foreground size-8" />
          </span>
          <CardTitle className="text-xl text-center font-bold">
            Verify OTP
          </CardTitle>
          <CardDescription className="text-center">
            Enter the One-Time Password (OTP) sent to your email{" "}
            <strong>`{email}`</strong> to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <VerifyForgotPasswordOtpForm email={email} />
        </CardContent>
        <CardFooter className="grid gap-6">
          <ResendOtpTimer onSendOtp={() => resendForgotPasswordOTP(email)} />
        </CardFooter>
      </Card>
    </>
  );
};

export default ForgotPasswordVerifyOtpPage;
