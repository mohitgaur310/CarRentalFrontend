import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistApi } from '../../api/wishlist.api';
import { getErrorMessage } from '../../utils';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await wishlistApi.getWishlist();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggle',
  async ({ carId, isInWishlist, wishlistId }, { rejectWithValue }) => {
    try {
      if (isInWishlist) {
        await wishlistApi.removeFromWishlist(wishlistId);
        return { carId, removed: true };
      }
      const { data } = await wishlistApi.addToWishlist(carId);
      return { carId, item: data, removed: false };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload.items || action.payload;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        if (action.payload.removed) {
          state.items = state.items.filter(
            (item) => item.carId !== action.payload.carId && item.car?.id !== action.payload.carId
          );
        } else if (action.payload.item) {
          state.items.push(action.payload.item);
        }
      });
  },
});

export default wishlistSlice.reducer;
