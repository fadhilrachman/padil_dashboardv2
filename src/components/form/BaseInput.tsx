import React, { ChangeEvent } from "react";

interface Props {
  placeholder?: string;
  type?: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}

const BaseInput = ({
  placeholder,
  type,
  className,
  onChange,
  value,
}: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${className} bg-[#1D2032] focus:outline-none rounded-lg px-4 py-3`}
    />
  );
};

export default BaseInput;
