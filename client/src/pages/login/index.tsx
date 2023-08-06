import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <section className=" bg-black w-3/6 h-auto flex flex-row justify-center items-center rounded-2xl shadow-black shadow-lg">
        <div className="cardimg h-full rounded-2xl w-[60%]" />
        <div className="flex flex-col px-10 py-14 w-[40%]">
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
              className="bg-cyan-500 w-1/4 px-2 py-1 text-sm rounded-sm text-gray-100 outline-none hover:bg-[#FF8C34]"
              onClick={() => {
                console.log("logging in");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
