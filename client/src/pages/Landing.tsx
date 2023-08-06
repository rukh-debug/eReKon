import React from "react";

const Landing = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="landingimg justify-center items-center w-full flex flex-col flex-auto h-2/3">
        <span className="font-mono text-4xl text-[#FF8C34]">
          Welcome to eReKon
        </span>
        <span className="text-5xl text-[#FF8C34]">MAKE YOUR RECON EASY</span>
      </div>
      <section
        id="feature-section"
        className="bg-[#14181B] flex flex-col flex-auto h-1/3"
      >
        <div className="flex flex-col justify-center items-center py-5">
          <span className="text-2xl">FEATURES</span>
          <span className="text-gray-500">
            Only Features You Will Ever Need
          </span>
        </div>
        <div className="w-full flex flex-row width-50 py-6">
          <div className="flex flex-col items-end flex-auto w-1/3">
            <span className="text-xl">Scan History</span>
            <span className="text-gray-500 text-sm">
              Keeps history of all your scans
            </span>
          </div>
          <div className="flex flex-col justify-center items-center flex-auto w-1/3">
            <span className="text-xl">Vulnerability finder</span>
            <span className="text-gray-500 text-sm">
              Integrated with various vulnerability finders
            </span>
          </div>
          <div className="flex flex-col items-start flex-auto w-1/3">
            <span className="text-xl">Scan modes</span>
            <span className="text-gray-500 text-sm">
              Enjoy the modes Fast and Effective
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
