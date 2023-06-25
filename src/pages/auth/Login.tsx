import React, { useEffect } from "react";
import BaseInput from "../../components/form/BaseInput";
import BaseButton from "../../components/form/BaseButton";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook";
import toast, { Toaster } from "react-hot-toast";
import { RequestLogin } from "../../utils/interfaces/user";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/user";
import Cookies from "js-cookie";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const token = Cookies.get("token");

  const initialValues: RequestLogin = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().required("cannot be empty"),
      password: Yup.string()
        .required("cannot be empty")
        .min(6, "minimum 6 character password"),
    }),
    onSubmit: async (val) => {
      console.log(val);
      //   await dispatch(register(val));
      await dispatch(login(val));
    },
  });
  useEffect(() => {
    if (formik.isSubmitting) {
      if (user.status === "succes") {
        toast("Login Success ", {
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
        navigate("/");
        window.location.reload();
        // setTimeout(() => {
        //   formik.resetForm();
        // }, 2000);
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
  }, [formik.isSubmitting]);
  // console.log({
  //   count: formik.submitCount,
  //   submit: formik.isSubmitting,
  // });
  console.log(token);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-[#1A1E30] rounded-lg p-5 w-4/12">
        <h1 className="text-3xl font-semibold mb-5">SignIn</h1>
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
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
          <BaseButton type="submit" className="w-full mt-5 bg-sky-700">
            Submit
          </BaseButton>
        </form>
        <small>
          try{" "}
          <Link to="/register" className="text-sky-400 underline">
            registering
          </Link>
        </small>
      </div>
      <Toaster position="top-right" containerClassName="" reverseOrder={true} />
    </div>
  );
};

export default Login;
