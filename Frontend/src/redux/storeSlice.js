import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchNearbyStores = createAsyncThunk(
  'stores/fetchNearby',
  async ({ lat, lng }, { rejectWithValue }) => {
    try {
      const response = await api.get('/marketplace/stores/nearby', { 
        params: { lat, lng } 
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyStores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNearbyStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.stores || action.payload.data || [];
      })
      .addCase(fetchNearbyStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch stores';
      });
  },
});

export default storeSlice.reducer;
