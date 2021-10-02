// import dataTable from "menu-items/dataTable";
// import React from "react";
// import { useSelector } from "react-redux";


// const TableComponent = () => {
//     const tableData = useSelector(state => state.tableData.tableData);

//     console.log('tabledata', tableData)

//     if (tableData !== null) {
//     const renderList = tableData.map((data) => {
//         // const {userId, title, completed} = data;
//         return(
//             // <div className="four wide column">
//             //     <div className="ui link cards">
//             //         <div className="card">
//             //             <div className="content">
//             //                 <div className="header">{userId}</div>
//             //                 <div className="meta price">{title} </div>
//             //                 <div className="meta">{completed}</div>
//             //             </div>
//             //         </div>
//             //     </div>
//             // </div>
//             <pre>
//                 {JSON.stringify(data)}
//             </pre>
//             );
            
//     })


//     return (
//        <> 
//        {renderList}
//        </>
//     );
    
// };
// };

// export default TableComponent;

import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { columnsPoi, createPoiData } from "./tableFormat";



export default function TableComponent() {
    /* Configs for table */
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /* Access redux store */
    const tableData = useSelector(state => state.tableData);

    /* Data to populate table dynamically */
    const [rows, setRows] = useState([]);

    useEffect(() => {
        let x = tableData.tableData.map((data) => {
            return createPoiData(data.poi_id, data.name, data.lat, data.lon);
        });
        setRows(x);
    }, [tableData.tableData]);

  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
        <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnsPoi.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columnsPoi.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </>
    );
  }
