import React, { ChangeEvent } from "react";

interface Props {
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  value?: string | "";
  errMessage?: string;
  isInvalid?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
}
const BaseSelect = ({
  className,
  onChange,
  errMessage,
  value,
  name,
  isInvalid,
  children,
  onBlur,
}: Props) => {
  return (
    <>
      <select
        className={`${className} ${
          isInvalid ? "border border-red-400" : ""
        } shadow    rounded-lg  px-4 py-3  bg-[#1D2032] focus:outline-none focus:shadow-outline`}
        onChange={onChange}
        name={name}
        value={value}
        onBlur={onBlur}
      >
        {children}
      </select>
      <br></br>

      {isInvalid && <small className="text-red-400">{errMessage}</small>}
    </>
  );
};

export default BaseSelect;
