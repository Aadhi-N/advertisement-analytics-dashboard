import { combineReducers } from "redux";

/* Reducer imports */
import customizationReducer from "./customizationReducer";
import { tableDataReducer } from "./tableDataReducer";
import clickChartDataReducer from "./clickChartDataReducer";
import eventChartDataReducer from "./eventChartDataReducer";

// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({
    customization: customizationReducer,
    tableData: tableDataReducer,
    clickChartData: clickChartDataReducer,
    eventChartData: eventChartDataReducer
});

export default reducer;
