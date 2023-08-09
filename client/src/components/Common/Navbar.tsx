import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

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
            router.push("/");
          }}
        />
        {/* If user is logged out */}
        
        <div className="flex justify-between">
          <Link className="px-3 text-gray-400" href="/register">
            Register
          </Link>
          <Link className="px-3 text-gray-400" href="/login">
            Login
          </Link>
        </div>

        {/* If user is logged in */}
        {/* <div>
        ...
      </div> */}
      </div>
    </div>
  );
};

export default Navbar;
