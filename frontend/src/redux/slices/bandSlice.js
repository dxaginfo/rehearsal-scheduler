import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  bands: [],
  currentBand: null,
  loading: false,
  error: null,
};

export const fetchBands = createAsyncThunk(
  'bands/fetchBands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/bands');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBand = createAsyncThunk(
  'bands/fetchBand',
  async (bandId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/bands/${bandId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBand = createAsyncThunk(
  'bands/createBand',
  async (bandData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/bands', bandData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBand = createAsyncThunk(
  'bands/updateBand',
  async ({ bandId, bandData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/bands/${bandId}`, bandData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBand = createAsyncThunk(
  'bands/deleteBand',
  async (bandId, { rejectWithValue }) => {
    try {
      await axios.delete(`/bands/${bandId}`);
      return bandId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bandSlice = createSlice({
  name: 'bands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBands.fulfilled, (state, action) => {
        state.bands = action.payload;
        state.loading = false;
      })
      .addCase(fetchBands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch bands';
      })
      .addCase(fetchBand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBand.fulfilled, (state, action) => {
        state.currentBand = action.payload;
        state.loading = false;
      })
      .addCase(fetchBand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch band';
      })
      .addCase(createBand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBand.fulfilled, (state, action) => {
        state.bands.push(action.payload);
        state.loading = false;
      })
      .addCase(createBand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create band';
      })
      .addCase(updateBand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBand.fulfilled, (state, action) => {
        const index = state.bands.findIndex((band) => band.id === action.payload.id);
        if (index !== -1) {
          state.bands[index] = action.payload;
        }
        if (state.currentBand && state.currentBand.id === action.payload.id) {
          state.currentBand = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateBand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update band';
      })
      .addCase(deleteBand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBand.fulfilled, (state, action) => {
        state.bands = state.bands.filter((band) => band.id !== action.payload);
        if (state.currentBand && state.currentBand.id === action.payload) {
          state.currentBand = null;
        }
        state.loading = false;
      })
      .addCase(deleteBand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete band';
      });
  },
});

export default bandSlice.reducer;