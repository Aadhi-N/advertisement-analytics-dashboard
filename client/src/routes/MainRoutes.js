import React, { lazy } from 'react';

/* Component imports */
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

/* Routing for pages */
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Table = Loadable(lazy(() => import('views/table')));


const routes = {
    root: {
        path: "/",
        element: <DashboardDefault />
    },
    dashboard: {
        path: "/dashboard/default",
        element: <DashboardDefault />
    },
    table: {
        all: {
            path: "/data-table/all",
            element: <Table header={"All Data"} urlParams={"all"} />,
            params: "",
        },
        poi: {
            path: "/data-table/poi",
            element: <Table header={"Points of Interest"} urlParams={"poi"} />,
            params: "",
        },
        stats: {
            path: "/data-table/stats",
            element: <Table header={"Stats"} urlParams={"stats/hourly"}/>,
            params: "",
        },
        events: {
            path: "/data-table/events",
            element: <Table header={"Events"} urlParams={"events/hourly"} />,
            params: "",
        }
    }
};

// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: routes.root.path,
            element: routes.root.element
        },
        {
            path: routes.dashboard.path,
            element: routes.dashboard.element
        },
        {
            path: routes.table.all.path,
            element: routes.table.all.element
        },
        {
            path: routes.table.poi.path,
            element: routes.table.poi.element
        },
        {
            path: routes.table.stats.path,
            element: routes.table.stats.element
        },
        {
            path: routes.table.events.path,
            element: routes.table.events.element
        },
    ]
};

export default MainRoutes;
