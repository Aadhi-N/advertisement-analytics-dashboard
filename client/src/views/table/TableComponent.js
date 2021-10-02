import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { t } from "./tableFormat";


export default function TableComponent( { urlParams }) {
    /* Configs for Material-UI table */
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /* Access redux store */
    const tableData = useSelector(state => state.tableData);

    /* Data to populate table dynamically using tableFormat imports */
    const [column, setColumn] = useState(null);
    const [populateColumn, setPopulateColumn] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
      console.log('table', urlParams)
    })

    useEffect(() => {
        let x = tableData.tableData.map((data) => {
            return t.poi.populate(data.poi_id, data.name, data.lat, data.lon);
        });
        setRows(x);
    }, [tableData.tableData]);

  
    /* Pagination */
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  
    return (
      tableData.error ? <p>{tableData.error.message}</p> : 
      (
        <>
        {JSON.stringify(tableData.tableData, null, 2)}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {t.poi.head.map((column) => (
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
                        {t.poi.head.map((column) => {
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

      )
    );
  }
