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
import { RequestArticle } from "../../utils/interfaces/article";
import { createDataArticle } from "../../redux/article";

const CreateDataArticle = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category);
  const article = useAppSelector((state) => state.article);
  const dataCategory = category.data.data;

  const initialValues: RequestArticle = {
    kategori: "",
    judul: "",
    tanggal: "",
    link: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      tanggal: Yup.date().required("This column cannot be empty"),
      judul: Yup.string().required("This column cannot be empty"),
      kategori: Yup.string().required("This column cannot be empty"),
      link: Yup.string().required("This column cannot be empty"),
    }),
    onSubmit: async (val) => {
      console.log(val);

      await dispatch(createDataArticle(val));
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
        <ButtonBack to="/article" />
        <Title title="Create Data Income" className="ml-3" />
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="border mt-7  border-[#55597D] border-opacity-30 p-5 rounded-lg">
          <div className="sm:text-right   w-9/12 ">
            <label htmlFor="" className="mr-4">
              Title
            </label>
            <BaseInput
              className="w-7/12"
              name="judul"
              onChange={formik.handleChange}
              value={formik.values.judul}
              isInvalid={formik.submitCount >= 1 && !!formik.errors.judul}
              errMessage={formik.errors.judul}
            />
          </div>
          <div className="sm:text-right   w-9/12  mt-5">
            <label htmlFor="" className="mr-4">
              Created Date
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
              Link
            </label>
            <BaseInput
              className="w-7/12"
              name="link"
              onChange={formik.handleChange}
              value={formik.values.link}
              isInvalid={formik.submitCount >= 1 && !!formik.errors.link}
              errMessage={formik.errors.link}
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
        </div>
        <BaseButton
          className="w-full mt-5"
          loading={article.status === "loading"}
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

export default CreateDataArticle;
