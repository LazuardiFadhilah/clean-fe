import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface BookingState {
  bedroom: string;
  bathroom: string;
  cleanType: string;
  subTotal: number;
  date: string | null;
  time: string;
  frequency: string; // Added frequency field
  address?: string; // Optional address field
}

const initialState: BookingState = {
  bedroom: "Studio",
  bathroom: "1",
  cleanType: "Standard",
  subTotal:0,
  date: null,
  time:"08:00",
  frequency: "One-Time", // Default frequency
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action: PayloadAction<Partial<BookingState>>) => {
      Object.assign(state, action.payload);
    },
    calculateSubTotal:(state)=>{
      const bedroomCount = state.bedroom === "Studio" ? 1 : Number(state.bedroom) || 1;
      const bathroomCount = Number(state.bathroom) || 1;

      const bedroomPrice = bedroomCount * 20;
      const bathroomPrice = bathroomCount * 10;

      let cleanTypePrice = 0;
      switch (state.cleanType) {
        case "Standard":
          cleanTypePrice = 50;
          break;
        case "Deep Clean":
          cleanTypePrice = 70;
          break;
        case "Moving In/Out":
          cleanTypePrice = 90;
          break;
        case "Post Construction":
          cleanTypePrice = 100;
          break;
      }

      state.subTotal = bedroomPrice + bathroomPrice + cleanTypePrice;
    },
    clearBookingData: () => ({...initialState}),
  },
});

export const { setBookingData, calculateSubTotal, clearBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;