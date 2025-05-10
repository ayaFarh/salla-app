import React, { useState } from "react";
import ButtonForm from "../helpers/ButtonForm";
import InputeForm from "../helpers/InputeForm";
import PasswordForm from "../helpers/PasswordForm";
import { Formik, Form } from "formik";
import { handelSignup } from "../../Redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {loading} =useSelector(state=>state.auth)
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    name:yup.string().required('name is required').min(3,'min name mast be 3 letters').max(15,'max name mast be 15 letter'),
    email:yup.string().required('email is required').email("write avalid email"),
    phone:yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone number must be 11 number start with 01'),
    password:yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Minimum eight characters, at least one letter and one number'),
    rePassword:yup.string().required('repassword is required').oneOf([yup.ref("password")],"password and repassword mast be same")
  })
  return (
    <section className="grid grid-cols-12 gap-2 h-screen ">
      <div className="col-span-12 md:col-span-6 max-h-screen relative">
        <img
          src="/1e23eb53cd92bad56e64e55163127a6c.png"
          alt=""
          className="w-full h-full object-cover object-[center_10%]"
        />
        <div className="flex items-center  absolute top-8 left-10 max-[280px]:left-6">
          <img
            src="/cart.png"
            alt="logo"
            className="w-8 h-8 max-[280px]:w-6   max-[280px]:h-6 "
          />
          <h1 className="text-2xl max-[280px]:text-lg font-semibold">
            Salla style
          </h1>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5 md:bg-white   bg-black/50  py-6 max-[766px]:absolute w-full h-full">
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
            rePassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={
           async(values) => {
            const result = await  dispatch(handelSignup(values))
           if (handelSignup.fulfilled.match(result)) {
                         navigate("/Auth/login");
                       }else{
                         setErrorMsg(result.payload.message)
                       }
           
           }
          }
        
        >
          {( { handleChange, handleBlur, values ,errors, touched }) => (
        <Form className="flex flex-col justify-center items-start space-y-2 w-[85%] m-auto h-full">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold max-[278px]:text-xl max-[766px]:text-white">
              Create new account
            </h2>
            <p className="text-gray-400 ">Please enter details</p>
          </div>

          <div className="flex flex-col w-full space-y-1">
            <InputeForm 
            labelName={"Name"}
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            condition={touched.name && !!errors.name}
            errorMessage={errors.name}
             />
          </div>

          <div className="flex flex-col w-full space-y-1">
            <InputeForm 
            labelName={"Phone"}
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            condition={touched.phone && !!errors.phone}
            errorMessage={errors.phone}
             />
          </div>

          <div className="flex flex-col w-full space-y-1">
            <InputeForm 
            labelName={"Email"} 
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            condition={touched.email && !!errors.email}
            errorMessage={errors.email}
            />
            {errorMsg?<p className="text-red-600">{errorMsg}</p>:null}
          </div>
          <div className="flex flex-col w-full space-y-1">
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

          <div className="flex flex-col w-full space-y-1">
            <PasswordForm
              labelName="rePassword"
              name="rePassword"
              condition={touched.rePassword && !!errors.rePassword}
               errorMessage={errors.rePassword}
              value={values.rePassword}
              onChange={handleChange}
              PasswordLight
            />
          </div>

          <div className="w-full  ">
            <ButtonForm className="w-full"
            loading={loading}
            >Sign up</ButtonForm>
          </div>
        </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
