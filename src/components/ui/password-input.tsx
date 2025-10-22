import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import {
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";

const PasswordInput = ({
  children,
  ...props
}: React.ComponentProps<"input">) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <InputGroupInput type={isVisible ? "text" : "password"} {...props} />
      {children}
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          className="rounded-full"
          size="icon-xs"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <EyeIcon /> : <EyeOffIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </>
  );
};

export default PasswordInput;
