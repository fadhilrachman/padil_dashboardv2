import React, { ChangeEvent } from "react";

interface Props {
  placeholder?: string;
  type?: string;
  className?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | Date;
  isInvalid?: boolean;
  errMessage?: string;
}

const BaseInput = ({
  placeholder,
  type,
  className,
  name,
  onChange,
  isInvalid,
  value,
  errMessage,
}: Props) => {
  const formattedValue = value instanceof Date ? value.toISOString() : value;
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={formattedValue}
        name={name}
        onChange={onChange}
        className={`${className} ${
          isInvalid && "border border-red-400"
        } bg-[#1D2032] focus:outline-none rounded-lg px-4 py-3`}
      />
      <br></br>
      {errMessage && (
        <small className="text-red-400 text-left">{errMessage}</small>
      )}
    </>
  );
};

export default BaseInput;
