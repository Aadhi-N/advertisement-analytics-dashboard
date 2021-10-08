import {useState, useRef} from 'react';

/* Styles imports */
import "./Map.styles.css";

/* React wrapper for Mapbox imports */
import MapGL, {Source, Layer} from 'react-map-gl';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN; 

console.log('TOKEN', MAPBOX_TOKEN)

const MapContainer = () => {
   
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
