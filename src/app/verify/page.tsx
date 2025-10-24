import VerifyForm from "@/components/forms/auth/verify-form";
import VerifyResendOtpTimer from "@/components/forms/auth/verify-resend-otp-timer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { UserCheck } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: { email: string };
}) => {
  const { email } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && session.user.emailVerified) {
    redirect("/inbox");
  }

  if (!email) {
    redirect("/login");
  }

  await auth.api.sendVerificationOTP({
    body: {
      email,
      type: "email-verification",
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md px-4 gap-6">
        <CardHeader>
          <span className="bg-primary p-4 mx-auto shrink-0 rounded-2xl shadow-xl w-fit mt-5 mb-3">
            <UserCheck className="text-primary-foreground size-8" />
          </span>
          <CardTitle className="text-xl text-center font-bold">
            Verify your Account
          </CardTitle>
          <CardDescription className="text-center">
            We have sent a 6-digit code to <strong>`{email}`</strong>. Please
            enter the code to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <VerifyForm className="w-full" email={email} />
        </CardContent>
        <CardFooter className="grid gap-6">
          <VerifyResendOtpTimer email={email} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
