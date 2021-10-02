export const columns = {
    all: {
        head: [
            { id: 'date', label: 'Date', minWidth: 50 },
            { id: 'hour', label: 'Hour', minWidth: 50 },
            { id: 'impressions', label: 'Impressions', minWidth: 50 },
            { id: 'clicks', label: 'Clicks', minWidth: 50 },
            { id: 'revenue', label: 'Revenue', minWidth: 50 },
            { id: 'events', label: 'Events', minWidth: 50 },
            { id: 'poi_id', label: 'POI ID', minWidth: 50 },
            { id: 'name', label: 'Name', minWidth: 50 },
            { id: 'lat', label: 'Lat', minWidth: 50 },
            { id: 'lon', label: 'Lon', minWidth: 50 },
        ],
        format: function(data) {
            return data;
        }
    },
    poi: {
        head: [
            { id: 'poi_id', label: 'POI ID', minWidth: 100 },
            { id: 'name', label: 'Name', minWidth: 100 },
            { id: 'lat', label: 'Lat', minWidth: 100 },
            { id: 'lon', label: 'Lon', minWidth: 100 }
        ],
        format: function(data) {
            return data;
        }
    },
    events: {
        head: [
            { id: 'date', label: 'Date', minWidth: 100 },
            { id: 'hour', label: 'Hour', minWidth: 100 },
            { id: 'events', label: 'Events', minWidth: 100 },
            { id: 'poi_id', label: 'POI ID', minWidth: 100 },
        ],
        format: function(data) {
            return data;
        }
    },
    stats: {
        head: [
            { id: 'date', label: 'Date', minWidth: 100 },
            { id: 'hour', label: 'Hour', minWidth: 100 },
            { id: 'impressions', label: 'Impressions', minWidth: 100 },
            { id: 'clicks', label: 'Clicks', minWidth: 100 },
            { id: 'revenue', label: 'Revenue', minWidth: 100 }
        ],
        format: function(data) {
            return data;
        }
    }
};