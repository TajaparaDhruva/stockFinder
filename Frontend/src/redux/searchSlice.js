import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const performSearch = createAsyncThunk(
  'search/performSearch',
  async ({ q, location }, { rejectWithValue }) => {
    try {
      const response = await api.get('/marketplace/search', { 
        params: { q, location } 
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  query: '',
  results: null, // can hold mixed products/stores or formatted results
  status: 'idle',
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload.data;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Search failed';
      });
  },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
