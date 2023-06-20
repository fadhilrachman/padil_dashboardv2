import React, { ChangeEvent } from "react";

interface Props {
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
  errMessage?: string;
  name?: string;
  value?: string;
  isInvalid?: boolean;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}
const TextArea = ({
  className,
  onChange,
  placeholder,
  errMessage,
  name,
  isInvalid,
  value,
  onBlur,
}: Props) => {
  return (
    <>
      <textarea
        className={`${className} ${
          isInvalid ? "border-red-500" : ""
        }  shadow w-full   rounded-lg  py-3 px-4  bg-[#1D2032] focus:outline-none focus:shadow-outline`}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        value={value}
        onBlur={onBlur}
      ></textarea>
      {isInvalid && <small className="text-red-500">{errMessage}</small>}
    </>
  );
};

export default TextArea;
