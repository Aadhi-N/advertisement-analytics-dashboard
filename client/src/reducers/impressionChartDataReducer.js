import { createSlice } from '@reduxjs/toolkit';

import moment from "moment";

// ===========================|| IMPRESSION CHART DATA REDUCER ||=========================== //

export const ImpressionChartDataReducer = createSlice({
    name: 'impressionChart',
    initialState: {
        data: [],
        isLoading: true
    },
    reducers: {
        monthly: (state, { action, payload }) => {
            /* Convert most popular time */
            const time = moment(payload[0].hour, "HH").format("h:mm A"); 
            return {
                ...state, 
                data: time ? time : payload, 
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
export const { actions } = ImpressionChartDataReducer;
export default ImpressionChartDataReducer.reducer;