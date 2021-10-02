export const t = {
    all: {
        head: [
            { id: 'id', label: 'Item', minWidth: 50 },
            { id: 'date', label: 'Date', minWidth: 50 },
            { id: 'hour', label: 'Hour', minWidth: 50 },
            { id: 'impressions', label: 'Impressions', minWidth: 50 },
            { id: 'clicks', label: 'Clicks', minWidth: 50 },
            { id: 'revenue', label: 'Revenue', minWidth: 50 },
            { id: 'events', label: 'Events', minWidth: 50 },
            { id: 'poi_id', label: 'Poi_id', minWidth: 50 },
            { id: 'name', label: 'Name', minWidth: 50 },
            { id: 'lat', label: 'Lat', minWidth: 50 },
            { id: 'lon', label: 'Lon', minWidth: 50 },
        ],
        populate: function(id, date, hour, impressions, clicks, revenue, events, poi_id, name, lat, lon) {
            return { id, date, hour, impressions, clicks, revenue, events, poi_id, name, lat, lon };
        }
    },
    poi: {
        head: [
            { id: 'id', label: 'Poi_id', minWidth: 100 },
            { id: 'name', label: 'Name', minWidth: 100 },
            { id: 'lat', label: 'Lat', minWidth: 100 },
            { id: 'lon', label: 'Lon', minWidth: 100 }
        ],
        populate: function(id, name, lat, lon) {
            return { id, name, lat, lon };
        }
    }
};

// export const columnsAllData = [
//     { id: 'id', label: 'Item', minWidth: 50 },
//     { id: 'date', label: 'Date', minWidth: 50 },
//     { id: 'hour', label: 'Hour', minWidth: 50 },
//     { id: 'impressions', label: 'Impressions', minWidth: 50 },
//     { id: 'clicks', label: 'Clicks', minWidth: 50 },
//     { id: 'revenue', label: 'Revenue', minWidth: 50 },
//     { id: 'events', label: 'Events', minWidth: 50 },
//     { id: 'poi_id', label: 'Poi_id', minWidth: 50 },
//     { id: 'name', label: 'Name', minWidth: 50 },
//     { id: 'lat', label: 'Lat', minWidth: 50 },
//     { id: 'lon', label: 'Lon', minWidth: 50 },
// ];

// export function createAllData(id, date, hour, impressions, clicks, revenue, events, poi_id, name, lat, lon) {
//     return { id, date, hour, impressions, clicks, revenue, events, poi_id, name, lat, lon };
// };

// export const columnsPoi = [
//     { id: 'id', label: 'Poi_id', minWidth: 100 },
//     { id: 'name', label: 'Name', minWidth: 100 },
//     { id: 'lat', label: 'Lat', minWidth: 100 },
//     { id: 'lon', label: 'Lon', minWidth: 100 }
// ];

// export function createPoiData(id, name, lat, lon) {
//     return { id, name, lat, lon };
// };


