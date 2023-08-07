import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  FormikProps,
  FieldProps,
} from "formik";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .lowercase()
    .trim()
    .required("Required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

interface FormInput {
  email: string;
  password: string;
  password2: string;
}

const Register: React.FC<{}> = () => {
  const initialValues: FormInput = {
    email: "",
    password: "",
    password2: "",
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <section className=" bg-black w-3/6 h-auto flex flex-row justify-center items-center rounded-2xl shadow-black shadow-lg">
        <div className="cardimg h-full rounded-2xl w-[60%]" />
        <div className="flex flex-col px-10 py-14 w-[40%]">
          <span className="text-2xl text-gray-100 py-4">Register</span>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values: FormInput) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({ errors, touched, isValidating }) => (
              <Form className="flex flex-col width-auto">
                <label className="text-gray-100 text-sm">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="border-1 rounded-sm text-black text-sm px-1 w-2/3 p-1 my-1 outline-none"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}

                <label className="text-gray-100 text-sm">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border-1 rounded-sm text-black text-sm px-1 w-2/3 p-1 my-1 outline-none"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}

                <label className="text-gray-100 text-sm">Passowrd again</label>
                <Field
                  type="password"
                  id="password2"
                  name="password2"
                  className="border-1 rounded-sm text-black text-sm px-1 w-2/3 p-1 my-1 outline-none"
                />
                {errors.password2 && touched.password2 && (
                  <div className="text-red-500 text-sm">{errors.password2}</div>
                )}

                <div className="py-1">
                  <button
                    type="submit"
                    className="bg-cyan-500 w-2/4 px-2 py-1 text-sm rounded-sm text-gray-100 outline-none hover:bg-[#FF8C34]"
                    onClick={() => {
                      console.log("Registering...");
                    }}
                  >
                    Register
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
};

export default Register;
