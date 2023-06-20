import React from "react";
import BaseButton from "./form/BaseButton";

interface Props {
  show: boolean;
  onHide: React.MouseEventHandler<HTMLButtonElement>;
  destroy?: React.MouseEventHandler<HTMLButtonElement>;
}
const ModalDelete = ({ show, onHide, destroy }: Props) => {
  return show ? (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-40 outline-none focus:outline-none">
      <div className="relative w-[500px] my-6 mx-auto bg-[#171B2D] p-5 rounded-lg">
        {/*content*/}

        <h1 className="text-2xl font-semibold">Delete Data</h1>

        <p className="mt-5">Are you sure you want to delete this data ?</p>
        <div className="mt-9 flex justify-end">
          <BaseButton className="mr-5" onClick={onHide}>
            Cancel
          </BaseButton>
          <BaseButton onClick={destroy}>Submit</BaseButton>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalDelete;
