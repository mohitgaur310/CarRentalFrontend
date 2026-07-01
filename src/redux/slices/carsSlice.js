import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { carApi } from '../../api/car.api';
import { getErrorMessage } from '../../utils';
import { mapApiCar, mapApiCars } from '../../utils/carMapper';

const parseCarsResponse = (response) => ({
  cars: mapApiCars(response.data),
  pagination: response.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 },
});

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (params, { rejectWithValue }) => {
    try {
      const response = await carApi.getCars(params);
      return parseCarsResponse(response);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchFeaturedCars = createAsyncThunk(
  'cars/fetchFeatured',
  async (limit = 6, { rejectWithValue }) => {
    try {
      const response = await carApi.getFeaturedCars(limit);
      return mapApiCars(response.data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchPopularCars = createAsyncThunk(
  'cars/fetchPopular',
  async (limit = 4, { rejectWithValue }) => {
    try {
      const response = await carApi.getPopularCars(limit);
      return mapApiCars(response.data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await carApi.getCarById(id);
      return mapApiCar(response.data);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchSimilarCars = createAsyncThunk(
  'cars/fetchSimilar',
  async ({ id, category }, { rejectWithValue }) => {
    try {
      const response = await carApi.getSimilarCars(id, category);
      return mapApiCars(response.data).filter((car) => car.id !== id).slice(0, 3);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    featuredCars: [],
    popularCars: [],
    selectedCar: null,
    similarCars: [],
    filters: {},
    pagination: { page: 1, limit: 12, total: 0, totalPages: 1 },
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearSelectedCar: (state) => {
      state.selectedCar = null;
      state.similarCars = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload.cars;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeaturedCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedCars.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredCars = action.payload;
      })
      .addCase(fetchFeaturedCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPopularCars.fulfilled, (state, action) => {
        state.popularCars = action.payload;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedCar = null;
      })
      .addCase(fetchSimilarCars.fulfilled, (state, action) => {
        state.similarCars = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearSelectedCar } = carsSlice.actions;
export default carsSlice.reducer;
