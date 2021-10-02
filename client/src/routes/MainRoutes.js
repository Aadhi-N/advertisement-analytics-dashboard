import React, { lazy } from 'react';

/* Component imports */
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

/* Routing for pages */
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Table = Loadable(lazy(() => import('views/table')));

/* Parameters for DB query */
const table = {
    allData: "stats/all",
    poi: "poi"
}

// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/data-table/all',
            element: <Table params={table.allData}/>
        },
        {
            path: '/data-table/poi',
            element: <Table params={table.poi}/>
        },
        {
            path: '/data-table/stats',
            element: <Table />
        },
        {
            path: '/data-table/events',
            element: <Table />
        },
    ]
};

export default MainRoutes;
