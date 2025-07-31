"use client";
// Import library, komponen UI, ikon, dan fungsi dari Redux
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setBookingData } from "@/lib/bookingSlice";
import { LuBedSingle } from "react-icons/lu";
import { LuShowerHead } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LiaBroomSolid } from "react-icons/lia";
import { LuMapPin } from "react-icons/lu";
import { Calendar } from "@/components/ui/calendar";

import * as React from "react";
import { cn } from "@/lib/utils";

// Komponen utama untuk halaman Booking Step 2
export default function Booking() {
  const dispatch = useDispatch();
  const { bedroom, bathroom, cleanType, subTotal, date } = useSelector(
    (state: RootState) => state.booking
  );
  const router = useRouter();

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
          Book Date
        </span>
        <div className="flex flex-col mt-[10px]">
          <span className="text-neutral-500 font-light text-[14px] text-left">
            Book a specific date you need your space sparkled
          </span>
        </div>

        {/* Komponen Calendar untuk memilih tanggal booking */}
        <Calendar
          mode="single"
          selected={
            date ? new Date(date) : undefined // Pastikan date tidak null
          }
          onSelect={(selectedDate) => {
            if (selectedDate) {
              dispatch(setBookingData({ date: selectedDate.toISOString() }));
            }
          }}
          disabled={{ before: new Date() }}
          className={cn(
            " mt-5 text-neutral-700 grid place-items-center w-full max-w-4xl"
          )}
        />
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
          <div onClick={()=>{
            router.push("/booking/step_3");
          }} className="bg-primary text-white font-semibold text-[18px] w-full items-center justify-center flex">
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
          <h1 className="text-neutral-100 font-bold text-3xl">Book Date</h1>
        </div>
        <span className="flex items-center justify-center text-neutral-500 font-light text-lg mt-2">
          Book a specific date you need your space sparkled
        </span>
        <div className="flex items-center justify-center mt-5 w-full">
          <Calendar
            mode="single"
            selected={
              date ? new Date(date) : new Date() // Pastikan date tidak null
            }
            onSelect={(selectedDate) => {
              if (selectedDate) {
                dispatch(setBookingData({ date: selectedDate.toISOString() }));
              }
            }}
            disabled={{ before: new Date() }}
            className={cn(
              "w-full max-w-4xl", // ukuran container calendar
              "text-neutral-700",
              "grid place-items-center",

              // custom tanggal jadi besar
              "[&_.rdp-day]:text-lg [&_.rdp-day]:w-14 [&_.rdp-day]:h-14"
            )}
          />
        </div>

        {/* Tombol NEXT di desktop */}
        <div className="flex items-center justify-center mt-13">
          <Button
            className="py-5 px-15 text-white font-semibold text-[18px]"
            onClick={() => {
              router.push("/booking/step_3");
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
