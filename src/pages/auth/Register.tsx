import React, { useEffect } from "react";
import BaseInput from "../../components/form/BaseInput";
import BaseButton from "../../components/form/BaseButton";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RequestRegister } from "../../utils/interfaces/user";
import { useAppDispatch, useAppSelector } from "../../hook";
import toast, { Toaster } from "react-hot-toast";
import { regiter } from "../../redux/user";

const Register = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const initialValues: RequestRegister = {
    nama: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      nama: Yup.string().required("cannot be empty"),
      email: Yup.string().required("cannot be empty"),
      password: Yup.string()
        .required("cannot be empty")
        .min(6, "minimum 6 character password"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "password error")
        .required("cannot be empty"),
    }),
    onSubmit: async (val) => {
      console.log(val);
      //   await dispatch(register(val));
      await dispatch(regiter(val));
    },
  });
  console.log({
    count: formik.submitCount,
    submit: formik.isSubmitting,
  });
  console.log(user);

  useEffect(() => {
    if (formik.isSubmitting) {
      if (user.status === "succes") {
        toast("Wait for confirmation in the email ", {
          icon: "✅",
          duration: 2000,
          style: {
            borderRadius: "10px",
            padding: "10px 10px",
            background: "#171B2D",
            boxShadow: "0 4px 8px 0 #ADB3CC",
            color: "#ADB3CC",
          },
        });
        setTimeout(() => {
          formik.resetForm();
        }, 2000);
      }
      if (user.status === "error") {
        toast(`${user.message} `, {
          duration: 1000,
          icon: "❌",
          style: {
            borderRadius: "10px",
            padding: "10px 10px",
            background: "#171B2D",
            boxShadow: "0 4px 8px 0 #ADB3CC",
            color: "#ADB3CC",
          },
        });
      }
    }
  }, [formik.submitCount]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-[#1A1E30] rounded-lg p-5 w-[400px] sm:w-[500px]">
        <h1 className="text-3xl font-semibold mb-5">SignUp</h1>
        {/* {formik.submitCount >= 1 ? "Mengirimkan..." : "Kirim"} */}
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="">Username</label>
            <br />
            <BaseInput
              className="mt-2 w-full"
              name="nama"
              onChange={formik.handleChange}
              value={formik.values.nama}
              errMessage={formik.errors.nama}
              isInvalid={formik.submitCount >= 1 && !!formik.errors.nama}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="">Email</label>
            <br />
            <BaseInput
              className="mt-2 w-full"
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              errMessage={formik.errors.email}
              isInvalid={formik.submitCount >= 1 && !!formik.errors.email}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="">Password</label>
            <br />
            <BaseInput
              className="mt-2 w-full"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              errMessage={formik.errors.password}
              isInvalid={formik.submitCount >= 1 && !!formik.errors.password}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="">Confirm Password</label>
            <br />
            <BaseInput
              className="mt-2 w-full"
              name="confirm_password"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
              errMessage={formik.errors.confirm_password}
              isInvalid={
                formik.submitCount >= 1 && !!formik.errors.confirm_password
              }
            />
          </div>
          <BaseButton type="submit" className="w-full mt-5 bg-sky-700">
            Submit
          </BaseButton>
        </form>
        <small>
          try{" "}
          <Link to="/login" className="text-sky-400 underline">
            Login
          </Link>
        </small>
      </div>

      <Toaster position="top-right" containerClassName="" reverseOrder={true} />
    </div>
  );
};

export default Register;
