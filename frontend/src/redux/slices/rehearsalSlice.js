import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  rehearsals: [],
  currentRehearsal: null,
  loading: false,
  error: null,
};

export const fetchRehearsals = createAsyncThunk(
  'rehearsals/fetchRehearsals',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('/rehearsals', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRehearsal = createAsyncThunk(
  'rehearsals/fetchRehearsal',
  async (rehearsalId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/rehearsals/${rehearsalId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createRehearsal = createAsyncThunk(
  'rehearsals/createRehearsal',
  async (rehearsalData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/rehearsals', rehearsalData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRehearsal = createAsyncThunk(
  'rehearsals/updateRehearsal',
  async ({ rehearsalId, rehearsalData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/rehearsals/${rehearsalId}`, rehearsalData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRehearsal = createAsyncThunk(
  'rehearsals/deleteRehearsal',
  async (rehearsalId, { rejectWithValue }) => {
    try {
      await axios.delete(`/rehearsals/${rehearsalId}`);
      return rehearsalId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const respondToRehearsal = createAsyncThunk(
  'rehearsals/respondToRehearsal',
  async ({ rehearsalId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/rehearsals/${rehearsalId}/respond`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const rehearsalSlice = createSlice({
  name: 'rehearsals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRehearsals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRehearsals.fulfilled, (state, action) => {
        state.rehearsals = action.payload;
        state.loading = false;
      })
      .addCase(fetchRehearsals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch rehearsals';
      })
      .addCase(fetchRehearsal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRehearsal.fulfilled, (state, action) => {
        state.currentRehearsal = action.payload;
        state.loading = false;
      })
      .addCase(fetchRehearsal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch rehearsal';
      })
      .addCase(createRehearsal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRehearsal.fulfilled, (state, action) => {
        state.rehearsals.push(action.payload);
        state.loading = false;
      })
      .addCase(createRehearsal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create rehearsal';
      })
      .addCase(updateRehearsal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRehearsal.fulfilled, (state, action) => {
        const index = state.rehearsals.findIndex((rehearsal) => rehearsal.id === action.payload.id);
        if (index !== -1) {
          state.rehearsals[index] = action.payload;
        }
        if (state.currentRehearsal && state.currentRehearsal.id === action.payload.id) {
          state.currentRehearsal = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateRehearsal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update rehearsal';
      })
      .addCase(deleteRehearsal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRehearsal.fulfilled, (state, action) => {
        state.rehearsals = state.rehearsals.filter((rehearsal) => rehearsal.id !== action.payload);
        if (state.currentRehearsal && state.currentRehearsal.id === action.payload) {
          state.currentRehearsal = null;
        }
        state.loading = false;
      })
      .addCase(deleteRehearsal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete rehearsal';
      })
      .addCase(respondToRehearsal.fulfilled, (state, action) => {
        // Update the current rehearsal with new attendance info if applicable
        if (state.currentRehearsal && state.currentRehearsal.id === action.payload.rehearsalId) {
          state.currentRehearsal.attendance = action.payload.attendance;
        }
      });
  },
});

export default rehearsalSlice.reducer;