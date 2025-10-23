"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyEmail } from "@/lib/actions/auth/verify-email";
import { cn } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const VerifyForm = ({
  className,
  email,
}: {
  className?: string;
  email: string;
}) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      toast.error("Verification code is required.");
      return;
    }

    if (code.length !== 6) {
      toast.error("Verification code must be 6 digits.");
      return;
    }

    setIsLoading(true);

    const response = await verifyEmail(email, code);
    if (response.success) {
      toast.success(response.message);
      redirect("/inbox");
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={code}
        onChange={(value) => setCode(value)}
      >
        <InputOTPGroup className="w-full">
          <InputOTPSlot className="flex-1 h-14" index={0} />
          <InputOTPSlot className="flex-1 h-14" index={1} />
          <InputOTPSlot className="flex-1 h-14" index={2} />
          <InputOTPSlot className="flex-1 h-14" index={3} />
          <InputOTPSlot className="flex-1 h-14" index={4} />
          <InputOTPSlot className="flex-1 h-14" index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button
        type="submit"
        className="w-full"
        onClick={handleVerify}
        isLoading={isLoading}
        loadingText="Verifying"
      >
        Verify
      </Button>
    </div>
  );
};

export default VerifyForm;
