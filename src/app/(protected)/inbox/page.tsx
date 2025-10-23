"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth/logout";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const InboxPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      redirect("/login");
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      InboxPage
      <Button
        onClick={handleLogout}
        isLoading={isLoading}
        loadingText="Logging out"
      >
        Logout
      </Button>
    </div>
  );
};

export default InboxPage;
