import { createSlice } from '@reduxjs/toolkit';
import moment from "moment";

// ===========================|| CLICK CHART DATA REDUCER ||=========================== //

export const revenueChartDataReducer = createSlice({
    name: 'revenueChart',
    initialState: {
        data: [],
        xAxis: [],
        sumRevenue: [],
        sumClicks: [],
        timeline: "",
        totalRevenueForTimeline: "",
        isLoading: true
    },
    reducers: { 
        chartData: (state, { action, payload }) => {
            return {
                ...state, 
                data: payload,
                xAxis: payload.map((item) => 
                    state.timeline === "daily" ? moment(item.hour, "hh").format('LT') : 
                    moment(item.date).format('MMM DD')
                ),
                sumRevenue: payload.map((item) =>  Number.parseFloat(item.revenue).toFixed(2)), //return 2 decimal points
                sumClicks: payload.map((item) => item.clicks),
                totalRevenueForTimeline: Number.parseFloat(payload[0].total_revenue).toFixed(2), //return 2 decimal points
                isLoading: false
            };
        },
        setTimeline: (state, { action, payload }) => {
            return {
                ...state,
                timeline: payload
            }
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