"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

import { LoginUser } from "@/lib/api/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Login() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async () => {
    if (!email || !password) {
      setErrorMsg("Email and password are required");
      return;
    }
    try {
      setErrorMsg("");
      const user = await LoginUser({ email, password });

      console.log("Login successful:", user);
      router.push("/"); // Redirect ke halaman utama setelah login
    } catch (error) {
      setErrorMsg("email atau password salah");
    }
  };

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
      }, 2000); // Hide error message after 2 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [errorMsg]);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            onClick={onSubmit}
          >
            Continue
          </Button>
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
      {errorMsg && (
        <Alert
          variant="destructive"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-fit max-w-[90%] min-w-[300px] border-grey-800 bg-white shadow-lg text-red-400 font-semibold text-sm"
        >
          <AlertTitle>Cannot Login!</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
