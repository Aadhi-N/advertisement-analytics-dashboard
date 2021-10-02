import { useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTableData, setTableDataError } from "../../actions/tableDataActions";
import { TABLE_DATA_ERROR } from "../../actions/types";
import TableComponent from "./TableComponent";


const Table = ({ dataKey, header, urlParams}) => {

    const dispatch = useDispatch();


    /* Access redux store */
    const tableDataError = useSelector(state => state.tableData.error);

    /* useCallback hook used to memoize previously fetched resuts. 
    When urlParams prop changes, function is called again to render Table component */
    const fetchTableData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5555/${urlParams}`);
            if (response.status === 200) {
                dispatch(setTableData(response.data));
            } else {
                dispatch(setTableDataError(response.status))
            }
        } catch (error) {
            console.log("Error", error);
            dispatch(setTableDataError(error))
        }
    }, [urlParams, dispatch])

    useEffect(fetchTableData, [ urlParams, fetchTableData ]);
    
    return (
        tableDataError ? 
            (
                <h1>{tableDataError.message}</h1>
            ) :
            (
                <div className="ui grid container">
                    <h1>{header}</h1>
                    <TableComponent dataKey={dataKey} urlParams={urlParams} />
                </div>
            )
    );
};

export default Table;