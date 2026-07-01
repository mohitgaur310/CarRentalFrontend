import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookingApi } from '../../api/booking.api';
import { getErrorMessage } from '../../utils';
import { mapApiBooking, mapApiBookings } from '../../utils/bookingMapper';

const parseBookingsResponse = (response) => ({
  bookings: mapApiBookings(response.data),
  pagination: response.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 },
});

export const createBooking = createAsyncThunk(
  'bookings/create',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await bookingApi.createBooking(bookingData);
      return mapApiBooking(response.data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchMyBookings = createAsyncThunk(
  'bookings/fetchMy',
  async (params, { rejectWithValue }) => {
    try {
      const response = await bookingApi.getMyBookings(params);
      return parseBookingsResponse(response);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchHostBookings = createAsyncThunk(
  'bookings/fetchHost',
  async (params, { rejectWithValue }) => {
    try {
      const response = await bookingApi.getHostBookings(params);
      return parseBookingsResponse(response);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await bookingApi.getBookingById(id);
      return mapApiBooking(response.data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateStatus',
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const response = await bookingApi.updateBookingStatus(id, data);
      return mapApiBooking(response.data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    hostBookings: [],
    currentBooking: null,
    pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.bookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchHostBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHostBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.hostBookings = action.payload.bookings;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchHostBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentBooking = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.currentBooking = action.payload;
        const updateList = (list) => {
          const idx = list.findIndex((b) => b.id === action.payload.id);
          if (idx !== -1) list[idx] = action.payload;
        };
        updateList(state.bookings);
        updateList(state.hostBookings);
      });
  },
});

export const { clearCurrentBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
