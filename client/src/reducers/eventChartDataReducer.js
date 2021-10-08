import { createSlice } from '@reduxjs/toolkit';

// ===========================|| CLICK CHART DATA REDUCER ||=========================== //

export const eventChartDataReducer = createSlice({
    name: 'eventChart',
    initialState: {
        eventChartData: [],
        sumClicks: [],
        isLoading: true
    },
    reducers: {
        daily: (state, { action, payload }) => {
            return {
                ...state, 
                eventChartData: Number(payload[0].sum_events), 
                isLoading: false
            };
        },
        weekly: (state, { action, payload }) => {

            /* Sum the 'total_clicks' property in the array of objects */
            const weeklyTotal = payload.reduce(function(prev, curr) {
                return Number(prev) + Number(curr.sum_events);
            }, 0);

            return {
                ...state, 
                eventChartData: weeklyTotal ? weeklyTotal : payload, 
                isLoading: false
            };
        },
        monthly: (state, { action, payload }) => {
             /* Sum the 'total_clicks' property in the array of objects */
             const monthlyTotal = payload.reduce(function(prev, curr) {
                return Number(prev) + Number(curr.sum_events);
            }, 0);

            return {
                ...state, 
                eventChartData: monthlyTotal ? monthlyTotal : payload, 
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
// export const { daily, weekly, monthly, chartError } = clickChartDataReducer.actions;
export const { actions } = eventChartDataReducer;
export default eventChartDataReducer.reducer;