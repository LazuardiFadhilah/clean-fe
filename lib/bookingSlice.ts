import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface BookingState {
  bedroom: string;
  bathroom: string;
  cleanType: string;
  subTotal: number;
}

const initialState: BookingState = {
  bedroom: "Studio",
  bathroom: "1",
  cleanType: "Standard",
  subTotal:0,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action: PayloadAction<BookingState>) => {
      return action.payload;
    },
    clearBookingData: () => initialState,
  },
});

export const { setBookingData, clearBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;