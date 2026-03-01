"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-nav-bg text-nav-text w-full">
      <div className="flex justify-between items-center py-3 px-4">

        {/* Logo */}
        <Image
          src="/elf_logo.svg"
          alt="Company Logo"
          width={120}
          height={40}
        />

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:flex-row lg:justify-between w-[50%]">
          <div>
            <ul className="flex gap-6 convert_upper uppercase">
            <li className="hover:underline cursor-pointer"><a href="">Home</a></li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Services</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
          </div>
          <div>
            < Button />
          </div>

        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full  bg-nav-bg shadow-md flex flex-col justify-center items-center ">
          <div>
            <ul className="flex flex-col p-4 gap-4 convert_upper">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Services</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
          </div>
          <div>
            < Button />
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;