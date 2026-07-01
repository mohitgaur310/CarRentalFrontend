import { createSlice } from '@reduxjs/toolkit';

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    currentPayment: null,
    payments: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPayment: (state, action) => {
      state.currentPayment = action.payload;
    },
    clearCurrentPayment: (state) => {
      state.currentPayment = null;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
  },
});

export const { setCurrentPayment, clearCurrentPayment, setPayments } = paymentsSlice.actions;
export default paymentsSlice.reducer;
