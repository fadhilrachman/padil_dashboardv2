import React, { useEffect } from "react";
import Title from "../../components/Title";
import BaseInput from "../../components/form/BaseInput";
import BaseButton from "../../components/form/BaseButton";
import { useAppDispatch, useAppSelector } from "../../hook";
import { getDataCategory } from "../../redux/category";
import BaseSelect from "../../components/form/BaseSelect";
import TextArea from "../../components/form/TextArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import ButtonBack from "../../components/ButtonBack";
import { RequestExpense } from "../../utils/interfaces/expense";
import { createDataExpense } from "../../redux/expense";

const CreateExpense = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category);
  const income = useAppSelector((state) => state.income);
  const dataCategory = category.data;

  const initialValues: RequestExpense = {
    kategori: "",
    total_pengeluaran: "",
    tanggal: "",
    deskripsi: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      tanggal: Yup.date().required("This column cannot be empty"),
      total_pengeluaran: Yup.number().required("This column cannot be empty"),
      kategori: Yup.string().required("This column cannot be empty"),
      deskripsi: Yup.string(),
    }),
    onSubmit: async (val) => {
      await dispatch(createDataExpense(val));
      formik.resetForm();
      toast("Succes Create Data ✔️", {
        // icon: "👏",
        style: {
          borderRadius: "10px",
          padding: "10px 10px",
          background: "#171B2D",
          boxShadow: "0 4px 8px 0 #ADB3CC",
          color: "#ADB3CC",
        },
      });
      // navigate("/category");
    },
  });
  useEffect(() => {
    dispatch(getDataCategory());
  }, []);
  console.log(formik.values);

  return (
    <div className="border  border-[#55597D] border-opacity-30 p-5 rounded-lg">
      <div className="flex">
        <ButtonBack to="/expense" />
        <Title title="Create Data Expense" className="ml-3" />
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="border mt-7  border-[#55597D] border-opacity-30 p-5 rounded-lg">
          <div className="sm:text-right   w-9/12 ">
            <label htmlFor="" className="mr-4">
              Expense
            </label>
            <BaseInput
              type="number"
              className="w-7/12"
              name="total_pengeluaran"
              onChange={formik.handleChange}
              value={formik.values.total_pengeluaran}
              isInvalid={
                formik.submitCount >= 1 && !!formik.errors.total_pengeluaran
              }
              errMessage={formik.errors.total_pengeluaran}
            />
          </div>
          <div className="sm:text-right   w-9/12  mt-5">
            <label htmlFor="" className="mr-4">
              Expense Date
            </label>
            <BaseInput
              type="date"
              className="w-7/12"
              name="tanggal"
              onChange={formik.handleChange}
              value={formik.values.tanggal}
              isInvalid={formik.submitCount >= 1 && !!formik.errors.tanggal}
              errMessage={formik.errors.tanggal}
            />
          </div>
          <div className="sm:text-right   w-9/12  mt-5">
            <label htmlFor="" className="mr-4">
              Category
            </label>
            <BaseSelect
              className="w-7/12"
              name="kategori"
              onChange={formik.handleChange}
              value={formik.values.kategori}
              isInvalid={formik.submitCount >= 1 && !!formik.errors.kategori}
              errMessage={formik.errors.kategori}
            >
              <option value="">Category</option>
              {dataCategory?.map((val: any, key) => {
                return (
                  <option value={val._id} key={key}>
                    {val.nama}
                  </option>
                );
              })}
            </BaseSelect>
          </div>
          <div className="sm:text-right   w-9/12  mt-5 flex items-start justify-end">
            <label htmlFor="" className="mr-4">
              Description
            </label>
            <TextArea
              className="w-7/12"
              name="deskripsi"
              onChange={formik.handleChange}
              value={formik.values.deskripsi}
            />
          </div>
        </div>
        <BaseButton
          className="w-full mt-5"
          loading={income.status === "loading"}
        >
          Submit
        </BaseButton>
      </form>
      <Toaster
        position="top-right"
        containerClassName=""
        // reverseOrder={false}
      />
    </div>
  );
};

export default CreateExpense;
