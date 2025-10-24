"use client";

import ResendOtpTimer from "@/components/resend-otp-timer";
import { Label } from "@/components/ui/label";
import { resendVerificationOTP } from "@/lib/actions/auth/verify-email";

interface VerifyResendOtpTimerProps {
  email: string;
}

const VerifyResendOtpTimer = ({ email }: VerifyResendOtpTimerProps) => {
  const handleResendOtp = async () => {
    return await resendVerificationOTP(email);
  };

  return (
    <Label className="mx-auto text-muted-foreground">
      Didn&apos;t receive OTP? <ResendOtpTimer onSendOtp={handleResendOtp} />
    </Label>
  );
};

export default VerifyResendOtpTimer;
