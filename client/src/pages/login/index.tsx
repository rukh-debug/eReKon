import React, { useState } from "react";
import axiosInstance from "@/axios.instance";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    axiosInstance
      .post("/user/login", {
        email,
        password,
      })
      .then((res) => {
        setIsSubmitting(false);
        console.log(res);
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <section className=" bg-black w-3/6 h-auto flex flex-row justify-center items-center rounded-2xl shadow-black shadow-lg">
        <div className="cardimg h-full rounded-2xl w-[60%]" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitting(true);
            handleLogin();
          }}
          className="flex flex-col px-10 py-14 w-[40%]"
        >
          <span className="text-2xl text-gray-100 py-4">Login</span>
          <label className="text-gray-100 text-sm">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            className="border-1 rounded-sm text-black text-sm px-1 w-2/3 p-1 my-1 outline-none"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="text-gray-100 text-sm">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            className="border-1 rounded-sm text-black text-sm px-1 w-2/3 p-1 my-1 outline-none"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="py-1">
            <button
              type="submit"
              className="bg-cyan-500 px-2 py-1 text-sm rounded-sm text-gray-100 outline-none hover:bg-[#FF8C34]"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
