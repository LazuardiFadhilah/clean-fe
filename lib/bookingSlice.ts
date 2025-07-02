import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface BookingState {
  bedroom: string;
  bathroom: string;
  cleanType: string;
}

const initialState: BookingState = {
  bedroom: "Studio",
  bathroom: "1",
  cleanType: "Standard",
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