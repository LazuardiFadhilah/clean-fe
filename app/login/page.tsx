import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Login() {
  return (
    <>
      <div className="flex flex-col items-center container mx-auto mt-10">
        <div className="flex justify-center">
         <Link href="/">
          <img
            src="./logo.png"
            className="w-[70px] h-[30px] md:w-[114px] md:h-[45px]"
            alt=""
          /></Link>
        </div>
        <h1 className="text-center text-2xl md:text-4xl font-bold text-neutral-100 mt-[72px]">
          Login
        </h1>
        <div className="flex flex-col items-center w-full">
          <Button variant="outline" className="max-w-[calc(100%-50px)] w-full mt-[35px] md:w-[382px] border-grey-800 border-2 text-neutral-100 font-semibold text-sm">
         <img src="./google.png" className="w-[18px] h-[18px]" alt="" /> Continue with Google
        </Button>
        <Button variant="outline" className="max-w-[calc(100%-50px)] w-full mt-[20px] md:w-[382px] border-grey-800 border-2 text-neutral-100 font-semibold text-sm">
         <img src="./apple.png" className="w-[18px] h-[18px]" alt="" /> Sign up with Apple
        </Button>
        <div className="w-full max-w-[calc(100%-50px)] md:w-[382px] h-[2px] bg-grey-900 mt-[20px]"/>
        </div>
      </div>
    </>
  );
}
