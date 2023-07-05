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
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils";
import { RequestExpense } from "../../utils/interfaces/expense";
import { getDataExpenseById, updateDataExpense } from "../../redux/expense";

const UpdateExpense = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category);
  const expense = useAppSelector((state) => state.expense);
  const dataExpense = expense.dataDetail;
  const dataCategory = category.data.data;

  const initialValues: RequestExpense = {
    kategori: "",
    total_pengeluaran: "",
    tanggal: "",
    deskripsi: "",
  };

  useEffect(() => {
    if (id) {
      dispatch(getDataExpenseById(id));
    }
  }, []);

  useEffect(() => {
    if (dataExpense !== undefined) {
      const tanggal = formatDate(dataExpense.tanggal);
      console.log({ tanggal });

      formik.setValues({
        kategori: dataExpense.kategori,
        tanggal: tanggal,
        total_pengeluaran: dataExpense.total_pengeluaran,
        deskripsi: dataExpense.deskripsi || "",
      });
    }
  }, [dataExpense]);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      tanggal: Yup.date().required("This column cannot be empty"),
      total_pengeluaran: Yup.number().required("This column cannot be empty"),
      kategori: Yup.string().required("This column cannot be empty"),
      deskripsi: Yup.string(),
    }),
    onSubmit: async (val) => {
      const obj: RequestExpense = {
        ...val,
        id,
      };
      await dispatch(updateDataExpense(obj));
      navigate("/expense");
      //   toast("Succes Create Data ✔️", {
      //     // icon: "👏",
      //     style: {
      //       borderRadius: "10px",
      //       padding: "10px 10px",
      //       background: "#171B2D",
      //       boxShadow: "0 4px 8px 0 #ADB3CC",
      //       color: "#ADB3CC",
      //     },
      //   });
    },
  });
  useEffect(() => {
    dispatch(getDataCategory());
  }, []);

  return (
    <div className="border  border-[#55597D] border-opacity-30 p-5 rounded-lg">
      <div className="flex">
        <ButtonBack to="/expense" />
        <Title title="Update Data Income" className="ml-3" />
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="border mt-7  border-[#55597D] border-opacity-30 p-5 rounded-lg">
          <div className="sm:text-right   w-9/12 ">
            <label htmlFor="" className="mr-4">
              Income
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
              Income Date
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
              {dataCategory?.map((val: any, key: number) => {
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
          loading={expense.status === "loading"}
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

export default UpdateExpense;
