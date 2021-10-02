import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTableData } from "../../actions/tableDataActions";
import { TABLE_DATA_ERROR } from "../../actions/types";
import TableComponent from "./TableComponent";


const Table = () => {
    const tableData = useSelector(state => state);
    const dispatch = useDispatch();

    const fetchTableData = async () => {
        const response = await axios
        // .get("https://jsonplaceholder.typicode.com/todos")
        .get("http://localhost:5555/poi")
        .catch((err) => {
            dispatch( {
                type: TABLE_DATA_ERROR,
                payload: err,
            })
            console.log("Err", err);
        });
        dispatch(setTableData(response.data));
    };

  

    useEffect(() => {
        fetchTableData();
    }, []);

    return (
        <div className="ui grid container">
            <TableComponent />
        </div>
    );
};

export default Table;