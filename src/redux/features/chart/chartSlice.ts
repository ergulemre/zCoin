import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCoinChartData } from './coinActions'; // Adjust path as needed

interface ChartState {
  chartData: number[];
  error: string | null;
}

const initialState: ChartState = {
  chartData: [],
  error: null,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCoinChartData.fulfilled,
        (state, action: PayloadAction<number[]>) => {
          state.chartData = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchCoinChartData.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch chart data';
      });
  },
});

export default chartSlice.reducer;
