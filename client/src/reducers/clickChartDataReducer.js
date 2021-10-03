import { createSlice } from '@reduxjs/toolkit';

import { SET_CLICK_CHART_DATA, CLICK_CHART_DATA_ERROR } from "../actions/types";
import { currentDate } from 'store/constant';

// ===========================|| CLICK CHART DATA REDUCER ||=========================== //

export const clickChartDataReducer = createSlice({
    name: 'clickChart',
    initialState: {
        clickChartData: [],
        isLoading: true
    },
    reducers: {
        daily: (state, action) => {
            var currentDate = new Date();
            var firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())).toUTCString();
            var lastday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)).toUTCString();
            console.log(currentDate, firstday, lastday)
            // const today = new Date();
            // const firstDay = today.setDate(today.getDate() - today.getDay()).toUTCString();
            // console.log('reducer', firstDay)
            // return state.clickChartData;
        },
        weekly: state => {
            console.log('this week', state.clickChartData);
            return state;
        },
        monthly: state => {
            console.log('this month', state.clickChartData);
            return state;
        }
    }
})

// Action creators are generated for each case reducer function
export const { daily, weekly, monthly } = clickChartDataReducer.actions;
export default clickChartDataReducer.reducer;