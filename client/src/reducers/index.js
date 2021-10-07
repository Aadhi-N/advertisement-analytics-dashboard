import { combineReducers } from "redux";

/* Reducer imports */
import customizationReducer from "./customizationReducer";
import { tableDataReducer } from "./tableDataReducer";
import clickChartDataReducer from "./clickChartDataReducer";
import eventChartDataReducer from "./eventChartDataReducer";
import impressionChartDataReducer from "./impressionChartDataReducer";
import popularTimesForClicksDataReducer from "./popularTimesForClicksDataReducer";
import locationChartDataReducer from "./locationChartDataReducer";

// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({
    customization: customizationReducer,
    tableData: tableDataReducer,
    clickChartData: clickChartDataReducer,
    eventChartData: eventChartDataReducer,
    impressionChartData: impressionChartDataReducer,
    popularTimeForClicks: popularTimesForClicksDataReducer,
    locationChartData: locationChartDataReducer
});

export default reducer;
