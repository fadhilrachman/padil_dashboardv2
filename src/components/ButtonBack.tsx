import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonBack = ({ to }: { to: string }) => {
  const navigate = useNavigate();
  return (
    <div
      className="border border-[#55597D]  rounded-lg w-max px-3 py-2 hover:cursor-pointer"
      onClick={() => navigate(to)}
    >
      <i className="bx bx-left-arrow-alt"></i>
    </div>
  );
};

export default ButtonBack;
