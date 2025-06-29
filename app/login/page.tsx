"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

export default function Login() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center container mx-auto mt-10">
        <div className="flex justify-center">
          <Link href="/">
            <img
              src="./logo.png"
              className="w-[70px] h-[30px] md:w-[114px] md:h-[45px]"
              alt=""
            />
          </Link>
        </div>
        <h1 className="text-center text-2xl md:text-4xl font-bold text-neutral-100 mt-[72px]">
          Login
        </h1>
        <div className="flex flex-col items-center w-full">
          <Button
            variant="outline"
            className="hover:border-primary max-w-[calc(100%-50px)] w-full mt-[35px] md:w-[382px] border-grey-800 border-2 text-neutral-100 font-semibold text-sm"
          >
            <img src="./google.png" className="w-[18px] h-[18px]" alt="" />{" "}
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="hover:border-primary max-w-[calc(100%-50px)] w-full mt-[20px] md:w-[382px] border-grey-800 border-2 text-neutral-100 font-semibold text-sm"
          >
            <img src="./apple.png" className="w-[18px] h-[18px]" alt="" /> Sign
            up with Apple
          </Button>
          <div className="w-full max-w-[calc(100%-50px)] md:w-[382px] h-[2px] bg-grey-900 mt-[20px]" />
        </div>
        <div className="flex flex-col w-full max-w-[calc(100%-50px)] md:w-[382px] mt-[20px]">
          <Label
            htmlFor="email"
            className="text-grey-600 font-semibold text-sm"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            className="mt-[10px] border-grey-800 border-2"
          />
          <Label
            htmlFor="email"
            className="text-grey-600 font-semibold text-sm mt-[15px]"
          >
            Password
          </Label>

          <div className="relative mt-[10px]">
            <Input
              id="password"
              type={show ? "text" : "password"}
              placeholder="password"
              className="pr-10 border-grey-800 border-2"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show ? <FaRegEyeSlash size={18} /> : <IoEyeSharp size={18} />}
            </button>
          </div>
          <Button
            className="w-full mt-[30px] h-[48px] bg-primary text-white font-semibold text-sm hover:bg-primary/90"
            type="submit">Continue</Button>
            <span className="text-sm text-neutral-400 mt-[20px]">
              Don't have an account?
              <Link
                href="/signup"
                className="text-primary text-sm hover:underline ml-[5px] font-semibold"
              >
                Sign up
              </Link>
            </span>
             <Link
                href="/forgot-password"
                className="text-primary text-sm hover:underline font-semibold mt-[10px]"
              >
                Forgot Password
              </Link>
        </div>
      </div>
    </>
  );
}
