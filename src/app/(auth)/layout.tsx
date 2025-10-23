import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const isVerified = session.user.emailVerified;
    redirect(isVerified ? "/inbox" : "/verify");
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full relative">
      <Link href="/" className="absolute top-5 left-5 h-12 w-12">
        <Image alt="logo" src="/logo.png" className="object-cover" fill />
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;
