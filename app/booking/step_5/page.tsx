"use client";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setBookingData } from "@/lib/bookingSlice";

export default function Step5() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    bedroom,
    bathroom,
    cleanType,
    subTotal,
    date,
    time,
    frequency,
    address,
    adds_ons,
    discount_code
  } = useSelector((state: RootState) => state.booking);

  return (
    <>
      {/* ================== Mobile View ================== */}
      <div className="flex flex-col mx-[25px] mt-10 md:hidden">
        <div className="flex justify-end">
          <FiX
            className="text-neutral-100"
            size={20}
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <span className="text-neutral-100 text-[25px] font-bold text-left mt-[37px] mb-[20px]">
          Receipt
        </span>
        <div className="flex flex-col mt-[10px] border-1 rounded-lg border-grey-900 p-[20px] shadow-lg">
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-light text-[14px]">
              {bedroom}
            </span>

            {/* garis vertikal */}
            <div className="w-[1px] h-[14px] bg-grey-800" />

            <span className="text-neutral-100 font-light  text-[14px]">
              {bathroom} Bathrooms
            </span>
            {/* garis vertikal */}
            <div className="w-[1px] h-[14px] bg-grey-800" />

            <span className="text-neutral-100 font-light text-[14px]">
              {cleanType}
            </span>
          </div>
          <div className="w-full h-[1px] bg-grey-800 mb-2" />
          <span className="text-neutral-100 font-light text-[14px]">
            {frequency} ,{" "}
            {date
              ? `${new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} at ${time}`
              : "Date not set"}
          </span>
          <div className="w-full h-[1px] bg-grey-800 my-2" />
          <span className="text-neutral-100 font-light text-[14px]">
            {address || "Address not set"}
          </span>
          <div className="w-full h-[1px] bg-grey-800 my-2" />
          <span className="text-neutral-100 font-light text-[14px]">
            Add-on:{" "}
            {Array.isArray(adds_ons) &&
            adds_ons.filter((item) => item !== "Yes" && item !== "No").length >
              0
              ? adds_ons
                  .filter((item) => item !== "Yes" && item !== "No")
                  .join(", ")
              : "Add-ons not set"}
          </span>
        </div>
        <div className="flex flex-row my-[20px] gap-0">
          <Input
            type="text"
            placeholder="Discount"
            className="rounded-l-lg rounded-r-none bg-white shadow-xl border-grey-900"
            onChange={(e)=>{
              dispatch(setBookingData({ discount_code: e.target.value }));
            }}
          />
          <Button className="rounded-l-none -ml-2 shadow-xl text-white font-semibold text-[14px] ">Apply</Button>
        </div>
        <div className="mb-30" />
      </div>

      {/* ================== */}
      {/* Footer untuk menampilkan subtotal dan tombol NEXT di mobile */}
      <footer className="fixed bottom-0 left-0 w-full z-10 md:hidden">
        <div className="flex flex-row">
          <div className="flex flex-col w-[60%] bg-neutral-200 py-[8px] px-[20px]">
            <span className="text-grey-700 font-semibold text-[14px]">
              SUB TOTAL
            </span>
            <span className="text-white font-bold text-[25px]">
              $ {subTotal}
            </span>
          </div>
          <div
            onClick={() => {
              router.push("/booking/step_5");
            }}
            className="bg-primary text-white font-semibold text-[18px] w-full items-center justify-center flex"
          >
            NEXT
          </div>
        </div>
      </footer>
    </>
  );
}
