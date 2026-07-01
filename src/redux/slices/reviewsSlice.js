import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    myReviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setMyReviews: (state, action) => {
      state.myReviews = action.payload;
    },
    addReview: (state, action) => {
      state.reviews.unshift(action.payload);
    },
  },
});

export const { setReviews, setMyReviews, addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
