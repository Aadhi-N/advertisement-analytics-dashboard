import { createSlice } from '@reduxjs/toolkit';

// ===========================|| CLICK CHART DATA REDUCER ||=========================== //

export const revenueChartDataReducer = createSlice({
    name: 'revenueChart',
    initialState: {
        data: [],
        isLoading: true
    },
    reducers: { 
        chartData: (state, { action, payload }) => {
            return {
                ...state, 
                data: payload,
                isLoading: false
            };
        },
        chartError: (error, { payload }) => {
            return {
                error: payload, 
                isLoading: false
            };
        } 
    }
})

// Action creators are generated for each case reducer function
export const { actions } = revenueChartDataReducer;
export default revenueChartDataReducer.reducer;