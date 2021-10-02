import { SET_TABLE_DATA } from "./types";

export const setTableData = (tableData) => {
    return {
        type: SET_TABLE_DATA,
        payload : tableData
    };
};
