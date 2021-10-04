<h1 align="center">
  Advertisement Analytics Dashboard
</h1>

## Overview
Link to site: []()

    This site was created using:
    - React
    - Recharts for charts + React-Map-GL for geo data
    - Express 
    - postgreSQL

    Hosted on Heroku.


#### Run project locally:

Clone the repo to your local machine.
```
git clone https://github.com/Aadhi-N/advertisement-analytics
cd server & cd client
```
Install all dependencies in each directory:
```
npm install
```

Start both servers:
```
server: node index.js 
client: npm start, open http://localhost:3000
```


### Features:

**Api Rate-Limiting:**
Per-client rate limiting implemented on all API endpoints without using external libraries. 

**Client-side Chart Visualizations:**
Functional data tables for users to browse through data supplied from API endpoints. 

**Client-side Geo Visualizations:**
Data visualization on a map based on points of interests. Users can select metrics and view intensities/clusters on the map. 


### Routes

Route | Path
------------ | -------------
Home | `GET /`
Dashboard | `GET /favourites`
Table - All Data | `GET /data-table/all-data`
Table - Points of Interest | `GET /data-table/poi`
Table - Events | `GET "/data-table/events`
Table - Stats | `GET "/data-table/stats`


### Dependencies

* React
* Material-UI
* React-redux
* Express
* Redis
