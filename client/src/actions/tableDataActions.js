import { SET_TABLE_DATA, TABLE_DATA_ERROR } from "./types";

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
