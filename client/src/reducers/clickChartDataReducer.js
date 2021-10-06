import { createSlice } from '@reduxjs/toolkit';

import { SET_CLICK_CHART_DATA, CLICK_CHART_DATA_ERROR } from "../actions/types";
import { currentDate } from 'store/constant';

// const daily = createAction('daily');
// const weekly = createAction('weekly');
// const monthly = createAction('monthly');

// ===========================|| CLICK CHART DATA REDUCER ||=========================== //

export const clickChartDataReducer = createSlice({
    name: 'clickChart',
    initialState: {
        clickChartData: [],
        isLoading: true
    },
    reducers: {
        daily: (state, { action, payload }) => {
            return {
                ...state, 
                clickChartData: Number(payload[0].sum_clicks), 
                isLoading: false
            };
        },
        weekly: (state, { action, payload }) => {

            /* Sum the 'total_clicks' property in the array of objects */
            const weeklyTotal = payload.reduce(function(prev, curr) {
                return Number(prev) + Number(curr.sum_clicks);
            }, 0);

            return {
                ...state, 
                clickChartData: weeklyTotal ? weeklyTotal : payload, 
                isLoading: false
            };
        },
        monthly: (state, { action, payload }) => {
             /* Sum the 'total_clicks' property in the array of objects */
             const monthlyTotal = payload.reduce(function(prev, curr) {
                return Number(prev) + Number(curr.sum_clicks);
            }, 0);

            return {
                ...state, 
                clickChartData: monthlyTotal ? monthlyTotal : payload, 
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
export const { actions } = clickChartDataReducer;
export default clickChartDataReducer.reducer;