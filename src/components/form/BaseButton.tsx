import React from "react";

interface Props {
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
}
const BaseButton = ({ type, className, children }: Props) => {
  return (
    <button
      type={type}
      className={`${className} focus:outline-none bg-[#1D2032] px-4 py-3 rounded-lg transition-all duration-150 hover:scale-105 active:scale-100`}
    >
      {children}
    </button>
  );
};

export default BaseButton;
