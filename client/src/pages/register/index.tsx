import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";

import axiosInstance from "@/axios.instance";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .lowercase()
    .trim()
    .required("Required"),
  username: Yup.string()
    .min(3, "Username should be at least 3 characters")
    .max(20, "Username should be at most 20 characters")
    .lowercase()
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
  username: string;
  password: string;
  password2?: string;
}

const Register: React.FC<{}> = () => {
  const initialValues: FormInput = {
    email: "",
    password: "",
    password2: "",
    username: "",
  };

  const [signupError, setSignupError] = useState("");

  const registerUser = async (
    values: FormInput,
    setSubmitting: (bool: boolean) => void,
    resetForm: () => void
  ) => {
    return new Promise((resolve, reject) => {
      setSubmitting(true);
      setSignupError("");
      // delete password2, doesnt require on server side.
      delete values.password2;

      // hit with predefined axios instance with baseurl
      axiosInstance
        .post("user/signup", values)
        .then((res: any) => {
          // handle data
          toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          resetForm();
          console.log(res);
        })
        .catch((err) => {
          setSignupError(err.response?.data?.message);
          resetForm();
          reject(err);
        })
        .finally(() => {
          setSubmitting(false);
        });
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center h-screen">
        <section className="bg-black w-3/6 h-auto flex flex-row justify-center items-center rounded-2xl shadow-black shadow-lg">
          <div className="cardimg h-full rounded-2xl w-[60%]" />
          <div className="flex flex-col px-10 py-14 w-[40%]">
            <span className="text-2xl text-gray-100 py-4">Register</span>
            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={async (
                values: FormInput,
                { setSubmitting, resetForm }: FormikHelpers<FormInput>
              ) => {
                setSubmitting(true);
                await registerUser(values, setSubmitting, resetForm);
                resetForm();
              }}
            >
              {({ errors, touched, isValidating, isSubmitting }) => (
                <Form className="flex flex-col width-auto">
                  {signupError ? (
                    <div className="text-red-500 text-sm">{signupError}</div>
                  ) : null}
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

                  <label className="text-gray-100 text-sm">Username</label>
                  <Field
                    type="username"
                    id="username"
                    name="username"
                    className="border-1 rounded-sm text-black text-sm px-1 w-2/3 p-1 my-1 outline-none"
                  />
                  {errors.username && touched.username && (
                    <div className="text-red-500 text-sm">
                      {errors.username}
                    </div>
                  )}

                  <label className="text-gray-100 text-sm">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="border-1 rounded-sm text-black text-sm px-1 w-2/3 p-1 my-1 outline-none"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}

                  <label className="text-gray-100 text-sm">
                    Passowrd again
                  </label>
                  <Field
                    type="password"
                    id="password2"
                    name="password2"
                    className="border-1 rounded-sm text-black text-sm px-1 w-2/3 p-1 my-1 outline-none"
                  />
                  {errors.password2 && touched.password2 && (
                    <div className="text-red-500 text-sm">
                      {errors.password2}
                    </div>
                  )}

                  <div className="py-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-cyan-500 px-2 py-1 text-sm rounded-sm text-gray-100 outline-none hover:bg-[#FF8C34]"
                    >
                      {isSubmitting ? "Registering..." : "Register"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
