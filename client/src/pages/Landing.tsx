import React from "react";
// import Header from "@/components/Common/Header";

const Landing = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="landingimg justify-center items-center w-full flex flex-col flex-auto h-2/3">
        <h1 className="font-mono text-4xl text-[#FF8C34]">Welcome to eReKon</h1>
        <h5 className="text-5xl text-[#FF8C34]">MAKE YOUR RECON EZPZ</h5>
      </div>
      <div className="bg-[#14181B] flex flex-col justify-center items-center flex-auto h-1/3">
        <div className="flex flex-col p-2 justify-center items-center">
          <h1 className="text-2xl">FEATURES</h1>
          <p className="text-gray-500">Only Features You Will Ever Need</p>
        </div>
        <div className="w-full flex flex-row width-50">
          <div className="flex flex-col items-end flex-auto w-1/3">
            <h1 className="text-xl">Scan History</h1>
            <p className="text-gray-500 text-sm">Keeps history of all your scans</p>
          </div>
          <div className="flex flex-col justify-center items-center flex-auto w-1/3">
            <h1 className="text-xl">Vulnerability finder</h1>
            <p className="text-gray-500 text-sm">
              Integrated with various vulnerability finders
            </p>
          </div>
          <div className="flex flex-col items-start flex-auto w-1/3">
            <h1 className="text-xl">Scan modes</h1>
            <p className="text-gray-500 text-sm">Enjoy the modes Fast and Effective</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
