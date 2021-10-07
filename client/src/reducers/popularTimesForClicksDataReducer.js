import { createSlice } from '@reduxjs/toolkit';

import moment from "moment";

// ===========================|| POPULAR TIME FOR CLICKS CHART DATA REDUCER ||=========================== //

export const PopularTimeForClicksDataReducer = createSlice({
    name: 'clicksChart',
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
export const { actions } = PopularTimeForClicksDataReducer;
export default PopularTimeForClicksDataReducer.reducer;