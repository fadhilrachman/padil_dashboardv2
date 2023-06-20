import React from "react";
import Title from "../../components/Title";
import BaseInput from "../../components/form/BaseInput";
import BaseButton from "../../components/form/BaseButton";
import BaseSelect from "../../components/form/BaseSelect";
import ButtonBack from "../../components/ButtonBack";
import { useFormik } from "formik";
import * as Yup from "yup";
import Category from "../../utils/interfaces/category";
import { useAppDispatch, useAppSelector } from "../../hook";
import { createDataCategory } from "../../redux/category";
import { useNavigate } from "react-router-dom";

const CreateDataCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category);
  const initialValues: Category = {
    nama: "",
    type: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      nama: Yup.string().required("This column cannot be empty"),
      type: Yup.string().required("This column cannot be empty"),
    }),
    onSubmit: async (val) => {
      await dispatch(createDataCategory(val));
      navigate("/category");
    },
  });
  console.log(formik.errors);

  return (
    <div className="border  border-[#55597D] border-opacity-30 p-5 rounded-lg">
      <div className="flex">
        <ButtonBack to="/category" />
        <Title title="Create Data Income" className="ml-3" />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="border mt-7  border-[#55597D] border-opacity-30 p-5 rounded-lg">
          <div className="sm:text-right   w-[600px]">
            <label htmlFor="" className="mr-4">
              Category Name
            </label>
            <BaseInput
              className="w-6/12"
              type="text"
              name="nama"
              onChange={formik.handleChange}
              value={formik.values.nama}
              isInvalid={!!formik.errors.nama}
              errMessage={formik.errors.nama}
            />
          </div>
          <div className="sm:text-right   w-[600px] mt-5">
            <label htmlFor="" className="mr-4">
              Type
            </label>
            {/* <BaseInput type="date" className="w-6/12" /> */}
            <BaseSelect
              className="w-6/12"
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
              isInvalid={!!formik.errors.type}
              errMessage={formik.errors.type}
            >
              <option value="">Type Category</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </BaseSelect>
          </div>
        </div>
        <BaseButton
          className="w-full mt-5"
          type="submit"
          loading={category.status === "loading"}
        >
          Submit
        </BaseButton>
      </form>
    </div>
  );
};

export default CreateDataCategory;
