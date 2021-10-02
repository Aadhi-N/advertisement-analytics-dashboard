import {
    SET_TABLE_DATA,
    TABLE_DATA_ERROR
} from "../actions/types";

export const initialState = {
    tableData: [],
    isLoading: true
}

// ===========================|| TABLE DATA REDUCER ||=========================== //


export const tableDataReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_TABLE_DATA:
            return {
                ...state, 
                tableData: payload, 
                isLoading: false
            };

        case TABLE_DATA_ERROR:
            return {
                error: payload,
                isLoading: false
            }    
       
        default:
            return state;
    };
};
