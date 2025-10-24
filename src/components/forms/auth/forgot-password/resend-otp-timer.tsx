"use client";

import { Button } from "@/components/ui/button";
import { initiateForgotPassword } from "@/lib/actions/auth/password";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const ResendOtpTimer = ({ email }: { email: string }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsDisabled(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleResendOtp = async () => {
    if (isDisabled) return;

    setIsDisabled(true);

    const response = await initiateForgotPassword(email);

    if (response.success) {
      toast.success(response.message);
      // Start 2-minute timer (120 seconds)
      setTimeLeft(120);
    } else {
      toast.error(response.message);
      setIsDisabled(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Button
      variant="link"
      className="p-0 disabled:hover:no-underline"
      onClick={handleResendOtp}
      disabled={isDisabled}
    >
      {isDisabled ? `Resend OTP in ${formatTime(timeLeft)}` : "Resend OTP"}
    </Button>
  );
};

export default ResendOtpTimer;
