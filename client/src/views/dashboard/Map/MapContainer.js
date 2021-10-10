import {useState, useRef} from 'react';

/* Components imports */

import { Container, Grid, TextField, MenuItem, Typography } from "@material-ui/core";

/* Styles imports */
import "./Map.styles.css";
import { makeStyles } from '@material-ui/styles';

/* React wrapper for Mapbox imports */
import MapGL, { Source, Layer, NavigationControl } from 'react-map-gl';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN; 

const status = [
  {
      value: 'daily',
      label: 'Today'
  },
  {
      value: 'weekly',
      label: 'This Week'
  },
  {
      value: 'monthly',
      label: 'This Month'
  }
];

const navControlStyle= {
  right: 10,
  top: 10
};

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: "white",
    maxWidth: "100%",
    height: "100px",
    padding: "30px"
  }
}));

const MapContainer = () => {
  const classes = useStyles();
  const [value, setValue] = useState('daily');

   
    const [viewport, setViewport] = useState({
        latitude: 40.67,
        longitude: -103.59,
        zoom: 3,
        bearing: 0,
        pitch: 0
      });
      const mapRef = useRef(null);
    
      const onClick = event => {
        const feature = event.features[0];
        const clusterId = feature.properties.cluster_id;
    
        const mapboxSource = mapRef.current.getMap().getSource('earthquakes');
    
        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) {
            return;
          }
    
          setViewport({
            ...viewport,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
            zoom,
            transitionDuration: 500
          });
        });
      };

  return (
      <>
      <Container className={classes.bar} fixed>
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant="subtitle2">Total Revenue</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h3">By Location</Typography>
                    </Grid>
                </Grid>
            </Grid>
          <Grid item>
            <TextField
                select
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
          </Grid>
        </Grid>
      
      </Container>
      
      <MapGL
        {...viewport}
        width="100%"
        height="500px"
        mapStyle="mapbox://styles/mapbox/light-v10"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={onClick}
        ref={mapRef}
      >
        <NavigationControl style={navControlStyle} />
        <Source
          id="earthquakes"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </MapGL>
    </>
  );
};

export default MapContainer;
