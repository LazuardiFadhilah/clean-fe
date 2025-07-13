"use client";
// Import library, komponen UI, ikon, dan fungsi dari Redux
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { calculateSubTotal, setBookingData } from "@/lib/bookingSlice";
import { LuBedSingle } from "react-icons/lu";
import { LuShowerHead } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LiaBroomSolid } from "react-icons/lia";
import { LuMapPin } from "react-icons/lu";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Key } from "lucide-react";
import { Label } from "@/components/ui/label";

// Komponen utama untuk halaman Booking Step 2
export default function Booking() {
  const dispatch = useDispatch();
  const { bedroom, bathroom, cleanType, subTotal, date, frequency, address } =
    useSelector((state: RootState) => state.booking);
  const router = useRouter();
  const optFrequencies = ["one-time", "weekly", "bi-weekly", "monthly"];

  return (
    <>
      {/* Tampilan untuk mobile (md:hidden) */}
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
        <span className="text-neutral-100 text-[25px] font-bold text-left mt-[37px]">
          Select Frequency
        </span>
        <div className="flex flex-col my-[10px]">
          <span className="text-neutral-500 font-light text-[15px] text-left">
            Book for Shield's recurring plan and save 20% annually.
          </span>
        </div>

        {/* Komponen Calendar untuk memilih jam booking */}
        <div className="flex flex-col mt-[10px]">
          <h1 className="text-neutral-500 font-semibold text-[14px] mb-[10px]">
            RECURRING
          </h1>
          <div className="flex flex-row flex-wrap gap-2">
            {optFrequencies.map((Frq) => {
              const isSelected = frequency === Frq;
              return (
                <div
                  onClick={() => {
                    dispatch(setBookingData({ frequency: Frq }));
                  }}
                  key={Frq}
                  className={cn(
                    " py-[11px] px-[25px] border-[2px]  rounded-lg h-[50px] flex items-center justify-center cursor-pointer",
                    isSelected ? "border-primary" : "border-grey-800"
                  )}
                >
                  <h1
                    className={cn(
                      "font-semibold text-[14px]",
                      isSelected ? "text-primary" : "text-neutral-500"
                    )}
                  >
                    {Frq}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
        <span className="text-neutral-100 text-[25px] font-bold text-left mt-[37px]">
          Add Your Address & Detalis
        </span>
        <div className="flex flex-col my-[10px]">
          <span className="text-neutral-500 font-light text-[15px] text-left">
            Be spesific of any additional details we might need from you.
          </span>
        </div>

        {/* Komponen Calendar untuk memilih jam booking */}
        <div className="flex flex-col mt-[10px]">
          <Label className="text-neutral-500 font-semibold text-[14px] mb-2">
            ADDRESS
          </Label>
          <Input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => {
              dispatch(setBookingData({ address: e.target.value }));
            }}
            className="placeholder:font-semibold placeholder:text-[14px] w-full h-fit mb-4 border-2 border-grey-800 py-[9px]"
          />
        </div>
        <div className="mb-30" />
      </div>

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
          <div className="bg-primary text-white font-semibold text-[18px] w-full items-center justify-center flex">
            NEXT
          </div>
        </div>
      </footer>

      {/* Tampilan header untuk desktop (md:flex) */}
      {/* Menampilkan ringkasan pemesanan: bedroom, bathroom, cleanType, tanggal, dan alamat */}
      <div className="hidden md:flex fixed top-0 left-0 w-full h-[70px] bg-white shadow-md z-10 items-center">
        <div className="w-[60px] h-full flex items-center justify-center border-r-2 border-grey-600">
          <FiX
            className="text-neutral-300 w-6 h-6"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className="flex flex-1 justify-between items-center mx-6">
          <div className="flex flex-row items-center">
            <LuBedSingle className="text-neutral-500" size={20} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {bedroom}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">BEDROOMS</h1>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <LuShowerHead className="text-neutral-500" size={25} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {bathroom}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">BATHROOMS</h1>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <LiaBroomSolid className="text-neutral-500" size={25} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {cleanType}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">
                CLEAN TYPE
              </h1>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <LuCalendar className="text-neutral-500" size={20} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {date
                  ? new Date(date).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })
                  : "Select Date"}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">DATE</h1>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <LuMapPin className="text-neutral-500" size={20} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                Address
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">LOCATION</h1>
            </div>
          </div>
        </div>
        <div className="h-full min-w-[120px] bg-neutral-200 flex flex-col items-center justify-center px-4">
          <span className="text-white font-bold text-lg">$ {subTotal}</span>
          <span className="text-grey-600 text-xs font-semibold">SUB TOTAL</span>
        </div>
      </div>

      {/* Calendar versi desktop dengan tampilan lebih besar */}
      <div className="hidden flex-col md:flex pt-[100px] w-[calc(100%-50px)] mx-auto bg-white">
        <div className="flex w-full items-center justify-center">
          <h1 className="text-neutral-100 font-bold text-3xl">Book Timing</h1>
        </div>
        <span className="flex items-center justify-center text-neutral-500 font-light text-[18px] mt-2 mb-[30px]">
          Save even more by booking off-peak dates and times.
        </span>

        {/* Tombol NEXT di desktop */}
        <div className="flex items-center justify-center my-13">
          <Button
            className="py-5 px-15 text-white font-semibold text-[18px]"
            onClick={() => {
              router.push("/booking/step_4");
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
