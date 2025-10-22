import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
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
