import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="absolute w-full py-3">
      <div className="flex justify-between p-3 py-1 bg-transparent">
        <Image
          src="/Assets/img/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer"
          onClick={() => {
            window.location.href = "/";
          }}
        />
        {/* If user is logged out */}
        <div className="flex justify-between">
          <div className="px-3 text-gray-400">Register</div>
          <div className="px-1 text-gray-400">Login</div>
        </div>

        {/* If user is logged in */}
        {/* <div>
        ...
      </div> */}
      </div>
    </div>
  );
};

export default Header;
