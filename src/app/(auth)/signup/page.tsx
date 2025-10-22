import SignupForm from "@/components/forms/auth/signup-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { FacebookIcon, User } from "lucide-react";
import Link from "next/link";

const SignupPage = () => {
  return (
    <>
      <Card className="w-full max-w-md px-4 gap-6">
        <CardHeader>
          <span className="bg-primary p-4 mx-auto shrink-0 rounded-2xl shadow-xl w-fit mt-5 mb-3">
            <User className="text-primary-foreground size-8" />
          </span>
          <CardTitle className="text-xl text-center font-bold">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Get started right now and connect with your friends and family
            anytime, anywhere. All for free!.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SignupForm />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              className=" text-accent-foreground underline underline-offset-4"
              href="/login"
            >
              Login
            </Link>
          </p>
        </CardContent>
        <CardFooter className="grid gap-6">
          <div className="grid grid-cols-3 items-center gap-2 w-full">
            <Separator />
            <span className="text-sm text-muted-foreground text-center">
              Or continue with
            </span>
            <Separator />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full font-bold">
              G
            </Button>
            <Button variant="outline" className="w-full">
              <FacebookIcon />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignupPage;
