import React, { useState } from 'react'
import InputeForm from '../../Auth/helpers/InputeForm';
import { Formik, Form } from "formik";
import * as yup from "yup";
import { cashPayment, creatOnlinePayment } from '../../Redux/slices/shippingAdrees';
import { useDispatch, useSelector } from 'react-redux';
import ButtonForm from '../../Auth/helpers/ButtonForm';

export default function ShippingAdrees() {
    const [orderType,setOrderType]=useState("")
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch()
     const validationSchema = yup.object({
        details: yup
            .string()
            .required("details is required"),
          phone: yup
            .string()
            .required("phone is required"),
           
          city: yup
            .string()
            .required("city is required")
           

        });
  return (
    <div>
         <div className="flex flex-col w-full h-full items-center justify-center">
                    <Formik
                      initialValues={{ details: "", phone: "", city: "" }}
                      validationSchema={validationSchema}
                      onSubmit={async(values) => {
                       if(orderType==="cash"){
                        dispatch(cashPayment({values,id:cart.data._id}))
                       }else{
                       dispatch(creatOnlinePayment({values,id:cart.data._id}))
                       }
                      }}
                    >
                      {({ handleChange, handleBlur, values ,errors, touched }) => (
                        <Form className="flex flex-col justify-center items-start space-y-4 w-[85%] m-auto h-full">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-bold">Shipping Adrees</h2>
                          </div>
            
                          {/*  Field */}
                          <div className="flex flex-col w-full space-y-1">
                          <InputeForm
                              placeholder="city"
                              name="city"
                              type="city"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              condition={touched.city}
                              errorMessage={errors.city}
                            />
                            <InputeForm
                             placeholder="phone Address"
                              name="phone"
                              type="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              condition={touched.phone}
                              errorMessage={errors.phone}
                            />
                            <InputeForm
                              placeholder="details"
                              name="details"
                              type="details"
                              istextarea={true}
                              value={values.details}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              condition={touched.details}
                              errorMessage={errors.details}
                            />

                          </div>
                          {/*  Button */}
                          <div className='flex gap-2'>
                          <ButtonForm onClick={()=>setOrderType("cash")} className='btn-primary cursor-pointer min-w-[130px] text-center uppercase  '>cach order</ButtonForm>
                          <ButtonForm onClick={()=>setOrderType("online")} className=' min-w-[130px] cursor-pointer text-center uppercase rounded w-fit bg-green-400'>online payment</ButtonForm>
                          </div>
                          
                        </Form>
                      )}
                    </Formik>
                  </div>
    </div>
  )
}
