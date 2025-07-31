"use client";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setBookingData, clearBookingData } from "@/lib/bookingSlice";
import { useState } from "react";
import {
  LuBedSingle,
  LuCalendar,
  LuMapPin,
  LuShowerHead,
} from "react-icons/lu";
import { LiaBroomSolid } from "react-icons/lia";
import { billing } from "@/lib/api/billing";



export default function Step5() {
  const router = useRouter();
  const [inputCode, setInputCode] = useState("");
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
    discount_code,
  } = useSelector((state: RootState) => state.booking);

  let newSubTotal = subTotal;
  if (discount_code === "AR10OFF") {
    const discountAmount = subTotal * 0.1;
    newSubTotal = subTotal - discountAmount;
  }

  const onSubmit = async () => {
      try {
        
        const payment = await billing();
  
        console.log("Payment successful Added:", payment);
        dispatch(clearBookingData()); // Clear booking data after successful payment
        localStorage.removeItem("BookingID"); // Clear BookingID from localStorage
        router.push("/"); // Redirect ke halaman utama setelah login
      } catch (error) {
        console.error("Payment failed:", error);
        // Handle error, show notification, etc.
      }
    };
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
            onChange={(e) => {
              setInputCode(e.target.value);
            }}
          />
          <Button
            className="rounded-l-none -ml-2 shadow-xl text-white font-semibold text-[14px]"
            onClick={() =>
              dispatch(setBookingData({ discount_code: inputCode }))
            }
          >
            Apply
          </Button>
        </div>
        <div className="flex flex-col mt-[10px] border-1 rounded-lg border-grey-900 p-[20px] shadow-lg">
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-light text-[14px]">
              Appointment Value
            </span>
            <span className="text-neutral-100 font-semibold text-[14px]">
              $ {subTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-light text-[14px]">
              Discount
            </span>
            <span className="text-neutral-100 font-semibold text-[14px]">
              - ${" "}
              {discount_code === "AR10OFF"
                ? (subTotal * 0.1).toFixed(2)
                : "0.00"}
            </span>
          </div>
          <div className="w-full h-[1px] bg-grey-800 mb-2" />
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-light text-[14px]">
              Subtotal
            </span>
            <span className="text-neutral-100 font-semibold text-[14px]">
              $ {newSubTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-light text-[14px]">Tax</span>
            <span className="text-neutral-100 font-semibold text-[14px]">
              + $ {(newSubTotal * 0.1).toFixed(2)}
            </span>
          </div>
          <div className="w-full h-[1px] bg-grey-800 mb-2" />
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-semibold text-[14px]">
              Total
            </span>
            <span className="text-neutral-100 font-semibold text-[14px]">
              + $ {(newSubTotal + newSubTotal * 0.1).toFixed(2)}
            </span>
          </div>
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
              $ {newSubTotal.toFixed(2)}
            </span>
          </div>
          <div
            onClick={onSubmit}
            className="bg-primary text-white font-semibold text-[18px] w-full items-center justify-center flex"
          >
            NEXT
          </div>
        </div>
      </footer>

      {/* ================== Desktop Header ================== */}
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
              <h1 className="text-neutral-100 font-semibold text-md text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px]">
                {address && address.trim() !== "" ? address : "Address"}
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

      {/* ================== Desktop View ================== */}
      <div className="hidden flex-col md:items-center md:justify-center md:flex pt-[100px] w-[calc(100%-50px)] mx-auto bg-white">
        <span className=" text-neutral-100 text-[25px] font-bold text-left mt-[37px] mb-[20px]">
          Receipt
        </span>
        <div className="flex w-full max-w-[500px] flex-col mt-[10px] border-1 rounded-lg border-grey-900 p-[20px] shadow-lg">
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
        <div className="flex  w-full max-w-[500px]  flex-row my-[20px] gap-0">
          <Input
            type="text"
            placeholder="Discount"
            className="rounded-l-lg rounded-r-none bg-white shadow-xl border-grey-900"
            onChange={(e) => {
              setInputCode(e.target.value);
            }}
          />
          <Button
            className="rounded-l-none -ml-2 shadow-xl text-white font-semibold text-[14px]"
            onClick={() =>
              dispatch(setBookingData({ discount_code: inputCode }))
            }
          >
            Apply
          </Button>
        </div>
        <div className="flex flex-col  w-full max-w-[500px]  mt-[10px] border-1 rounded-lg border-grey-900 p-[20px] shadow-lg">
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-light text-[14px]">
              Appointment Value
            </span>
            <span className="text-neutral-100 font-semibold text-[14px]">
              $ {subTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-light text-[14px]">
              Discount
            </span>
            <span className="text-neutral-100 font-semibold text-[14px]">
              - ${" "}
              {discount_code === "AR10OFF"
                ? (subTotal * 0.1).toFixed(2)
                : "0.00"}
            </span>
          </div>
          <div className="w-full h-[1px] bg-grey-800 mb-2" />
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-light text-[14px]">
              Subtotal
            </span>
            <span className="text-neutral-100 font-semibold text-[14px]">
              $ {newSubTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-light text-[14px]">Tax</span>
            <span className="text-neutral-100 font-semibold text-[14px]">
              + $ {(newSubTotal * 0.1).toFixed(2)}
            </span>
          </div>
          <div className="w-full h-[1px] bg-grey-800 mb-2" />
          <div className="flex flex-row items-center justify-between mb-2">
            <span className="text-neutral-100 font-semibold text-[14px]">
              Total
            </span>
            <span className="text-neutral-100 font-semibold text-[14px]">
              + $ {(newSubTotal + newSubTotal * 0.1).toFixed(2)}
            </span>
          </div>
        </div>
         {/* Tombol NEXT di desktop */}
        <div className="flex items-center justify-center my-13">
          <Button
            className="py-5 px-15 text-white font-semibold text-[18px]"
            onClick={onSubmit}
          >
            Place Order
          </Button>
        </div>
      </div>
    </>
  );
}
