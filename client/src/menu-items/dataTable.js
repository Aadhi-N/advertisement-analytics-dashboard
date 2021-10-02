/* Tabler icons imports */
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd, IconBorderAll } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBrandFramer,
    IconLayoutGridAdd,
    IconBorderAll
};

// ===========================|| DATA TABLE MENU ITEMS ||=========================== //

const dataTable = {
    id: 'data',
    title: 'Data',
    type: 'group',
    children: [
        {
            id: 'tables',
            title: 'Tables',
            type: 'collapse',
            icon: icons.IconBorderAll,
            children: [
                {
                    id: 'all-data',
                    title: 'All Data',
                    type: 'item',
                    url: '/data-table/all',
                    breadcrumbs: false
                },
                {
                    id: 'poi',
                    title: 'Points of Interest',
                    type: 'item',
                    url: '/data-table/poi',
                    breadcrumbs: false
                },
                {
                    id: 'stats',
                    title: 'Stats',
                    type: 'item',
                    url: '/data-table/stats',
                    breadcrumbs: false
                },
                {
                    id: 'events',
                    title: 'Events',
                    type: 'item',
                    url: '/data-table/events',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default dataTable;
