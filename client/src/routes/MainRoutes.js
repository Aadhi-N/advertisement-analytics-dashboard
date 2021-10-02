import React, { lazy } from 'react';

/* Component imports */
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

/* Routing for pages */
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Table = Loadable(lazy(() => import('views/table')));


// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <DashboardDefault />
        },
        {
            path: "/dashboard/default",
            element: <DashboardDefault />
        },
        {
            path: "/data-table/all",
            element: <Table dataKey={"all"} header={"All Data"} urlParams={"all"} />,
        },
        {
            path: "/data-table/poi",
            element: <Table dataKey={"poi"} header={"Points of Interest"} urlParams={"poi"} />,
        },
        {
            path: "/data-table/stats",
            element: <Table dataKey={"stats"} header={"Stats"} urlParams={"stats/hourly"}/>,
        },
        {
            path: "/data-table/events",
            element: <Table dataKey={"events"} header={"Events"} urlParams={"events/hourly"} />,
        },
    ]
};

export default MainRoutes;
