import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonForm from "../helpers/ButtonForm";
import InputeForm from "../helpers/InputeForm";
import PasswordForm from "../helpers/PasswordForm";
import { Formik, Form } from "formik";
import { handelLogin } from "../../Redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

export default function Login() {
  const {loading} =useSelector(state=>state.auth)
  const [errorMsg, setErrorMsg] =useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
  });

  return (
    <section className="grid grid-cols-12 gap-2 h-screen">
      {/* Left Side */}
      <div className="col-span-12 md:col-span-6 max-h-screen relative">
        <img
          src="/Group-1.png"
          alt=""
          className="w-full h-full object-cover object-[center_10%]"
        />
        <div className="flex items-center absolute top-8 left-10 max-[280px]:left-6">
          <img
            src="/cart.png"
            alt="logo"
            className="w-8 h-8 max-[280px]:w-6 max-[280px]:h-6"
          />
          <h1 className="text-2xl max-[280px]:text-lg font-semibold">
            Salla style
          </h1>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-span-12 md:col-span-5 md:bg-white bg-black/50 py-6 max-[766px]:absolute w-full h-full">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async(values) => {
            const result = await dispatch(handelLogin(values))
            if (handelLogin.fulfilled.match(result)) {
              navigate("/");
            }else{
              setErrorMsg(result.payload.message)
            }
          }}
        >
          {({ handleChange, handleBlur, values ,errors, touched }) => (
            <Form className="flex flex-col justify-center items-start space-y-4 w-[85%] m-auto h-full">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Welcome 🖐</h2>
                <p className="text-gray-400">Please login here</p>
              </div>

              {/* Email Field */}
              <div className="flex flex-col w-full space-y-1">
                <InputeForm
                  labelName="Email Address"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  condition={touched.email && !!errors.email}
                  errorMessage={errors.email}
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col w-full space-y-1">
                <div className="relative">
                  <PasswordForm
                    labelName="Password"
                    name="password"
                    condition={touched.password && !!errors.password}
                     errorMessage={errors.password}
                    value={values.password}
                    onChange={handleChange}
                    PasswordLight
                  />
                </div>
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
              </div>

              {/* Forgot Password Link */}
              <div className="flex max-[332px]:flex-col justify-between items-center w-full">
                <Link to="/Auth/forgetpassword" className="max-[766px]:text-white">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <div className="w-full">
                <ButtonForm 
                loading={loading}
                className="w-full">Login</ButtonForm>
              </div>

              {/* Sign Up Link */}
              <div className="max-[766px]:text-white flex text-sm max-[280px]:flex-wrap">
                <p>
                  Don't have an account?{" "}
                  <Link to="/Auth/signup" className="font-semibold border-b">
                    Sign Up
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
