import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonForm from '../helpers/ButtonForm';
import InputeForm from '../helpers/InputeForm';
import { Formik, Form } from "formik";
import * as yup from "yup";
import { handelVerifyCode } from '../../Redux/slices/auth';


export default function VerifyCode() {
    const {loading} =useSelector(state=>state.auth)
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const validationSchema = yup.object({
        resetCode: yup
            .string()
            .required("code is required")
           
        });
    return (
        <section className="grid grid-cols-12 gap-2 h-screen">
          {/* Left Side */}
          <div className="col-span-12 md:col-span-6 max-h-screen relative">
            <img
              src="/f0d7729ca61b58222377fcda19925a67.png"
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
              initialValues={{resetCode: ""}}
              validationSchema={validationSchema}
              onSubmit={async(values) => {
                const result = await dispatch(handelVerifyCode(values))
                if (handelVerifyCode.fulfilled.match(result)) {
                  navigate("/Auth/resetpasswors");
                }else{
                  setErrorMsg(result.payload.message)
                }
              }}
            >
              {({ handleChange, handleBlur, values ,errors, touched }) => (
                <Form className="flex flex-col justify-center items-start space-y-4 w-[85%] m-auto h-full">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold">Welcome 🖐</h2>
                    <p className="text-gray-400">Please Enter your code</p>
                  </div>
    
                  {/* Email Field */}
                  <div className="flex flex-col w-full space-y-1">
                    <InputeForm
                      labelName="Enter your code"
                      name="resetCode"
                      type="resetCode"
                      value={values.resetCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      condition={touched.resetCode && !!errors.resetCode}
                      errorMessage={errors.resetCode}
                    />
                    {errorMsg && <p className="text-red-600">{errorMsg}</p>}
                  </div>
                  {/*  Button */}
                  <div className="w-full">
                    <ButtonForm 
                    loading={loading}
                    className="w-full">Verify</ButtonForm>
                  </div> 
                </Form>
              )}
            </Formik>
          </div>
        </section>
    
  )
}
