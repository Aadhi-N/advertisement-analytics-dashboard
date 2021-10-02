import dataTable from "menu-items/dataTable";
import React from "react";
import { useSelector } from "react-redux";


const TableComponent = () => {
    const tableData = useSelector(state => state.tableData.tableData);

    console.log('tabledata', tableData)

    if (tableData !== null) {
    const renderList = tableData.map((data) => {
        // const {userId, title, completed} = data;
        return(
            // <div className="four wide column">
            //     <div className="ui link cards">
            //         <div className="card">
            //             <div className="content">
            //                 <div className="header">{userId}</div>
            //                 <div className="meta price">{title} </div>
            //                 <div className="meta">{completed}</div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <pre>
                {JSON.stringify(data)}
            </pre>
            );
            
    })


    return (
       <> 
       {renderList}
       </>
    );
    
};
};

export default TableComponent;


// import { useState, useEffect } from 'react';
// import moment from "moment";


// const TableComponent = ({ tableData }) => {
//     const [isLoading, setIsLoading] = useState(true);
    
//     useEffect(() => {
//         if (tableData) {
//             setIsLoading(false);
//         }
//     }, [tableData]);


//     return (
//     <main>
//         <h1>Search All Data</h1>
//         <div style={{maxWidth: "100%"}}>
           
                
//             </div>
//     </main>
//     )
// };

// export default TableComponent;
