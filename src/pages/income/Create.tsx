import React from "react";
import Title from "../../components/Title";
import BaseInput from "../../components/form/BaseInput";
import BaseButton from "../../components/form/BaseButton";

const CreateDataIncome = () => {
  return (
    <div className="border  border-[#55597D] border-opacity-30 p-5 rounded-lg">
      <Title title="Create Data Income" />
      <div className="border mt-7  border-[#55597D] border-opacity-30 p-5 rounded-lg">
        <div className="text-right">
          <label htmlFor="" className="mr-4">
            Total Income
          </label>
          <BaseInput type="number" className="w-6/12" />
        </div>
        <div className="text-right mt-5">
          <label htmlFor="" className="mr-4">
            Date
          </label>
          <BaseInput type="date" className="w-6/12" />
        </div>
        <div className="text-right mt-5">
          <label htmlFor="" className="mr-4">
            Kategori
          </label>
          <BaseInput type="text" className="w-6/12" />
        </div>
      </div>
      <BaseButton className="w-full mt-5" loading={false}>
        Submit
      </BaseButton>
    </div>
  );
};

export default CreateDataIncome;
