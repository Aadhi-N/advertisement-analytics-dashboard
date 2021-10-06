import { SET_TABLE_DATA, TABLE_DATA_ERROR, SET_CLICKS_DATA, CLICKS_DATA_ERROR } from "./types";

export const setTableData = (tableData) => {
    return {
        type: SET_TABLE_DATA,
        payload: tableData
    };
};

export const setTableDataError = (error) => {
    return {
        type: TABLE_DATA_ERROR,
        payload: error
    }
};

// export const setClicksData = (clicksData) => {
//     return {
//         type: SET_CLICKS_DATA,
//         payload: clicksData
//     }
// };

// export const setClicksDataError = (error) => {
//     return {
//         type: CLICKS_DATA_ERROR,
//         payload: error
//     }
// };
