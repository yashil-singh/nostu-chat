import InitiateForgotPasswordForm from "@/components/forms/auth/forgot-password/initiate-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";

const ForgotPasswordPage = () => {
  return (
    <>
      <Card className="w-full max-w-md px-4 gap-6">
        <CardHeader>
          <span className="bg-primary p-4 mx-auto shrink-0 rounded-2xl shadow-xl w-fit mt-5 mb-3">
            <Lock className="text-primary-foreground size-8" />
          </span>
          <CardTitle className="text-xl text-center font-bold">
            Forgot your Password?
          </CardTitle>
          <CardDescription className="text-center">
            Don&apos;t worry! It happens to the best of us. Please enter your
            email and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <InitiateForgotPasswordForm />
        </CardContent>
      </Card>
    </>
  );
};

export default ForgotPasswordPage;
