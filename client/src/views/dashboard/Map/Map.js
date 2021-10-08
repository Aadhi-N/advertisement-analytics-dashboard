import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";

/* Styles imports */
import "./Map.styles.css";
import { ButtonGroup, Button } from "@material-ui/core";

/* Components imports */
import MapContainer from './MapContainer';


const Map = ({ mapsData, poiData }) => {
    const [dateInput, setDateInput] = useState('2017-01-01T05:00:00.000Z');
    const [hourlyInput, setHourlyInput] = useState('1')

  
    const handleTimelineSubmit = (e) => {
    //   e.preventDefault();
    //   const hour = e.target.name === "hourly" ? hourlyInput : null ;
    //   console.log('dateInput', e.target.name, hourlyInput)
    //   axios
    //   .get(`http://localhost:5555/events/map`, { params: {date: dateInput, hourly: hour}})
    //   .then((res) => {
    //     console.log('res.data', JSON.stringify(res.data));
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    };

    const [timeline, setTimeline] = useState('daily');
    const toggleTimeline = (timeline) => {
        setTimeline(timeline);
    };


    return (
        <main>
            <h1>Events by Location</h1>


            <form name="date" onSubmit={handleTimelineSubmit}>        
              <label>Date:
                <input name="date" type="text" value={dateInput}/>        
              </label>
              <input type="submit" value="Submit" />
            </form>

            <form name="hourly" onSubmit={handleTimelineSubmit}>        
              <label>Hourly:
                <input name="hourly" type="text" value={hourlyInput}/>        
              </label>
              <input type="submit" value="Submit" />
            </form>

           
           
            <ButtonGroup className="timeline-btns" color="primary" aria-label="outlined primary button group">
                <Button variant={timeline === "hourly" ? "contained" : "outlined"} onClick={()=> toggleTimeline('hourly')}>Hourly</Button>
                <Button variant={timeline === "daily" ? "contained" : "outlined"} onClick={()=> toggleTimeline('daily')}>Daily</Button>
            </ButtonGroup>
            
            <input type="date" id="start" name="trip-start"
              value="2018-07-22"
              min="2018-01-01" max="2018-12-31"/>

            <div style={{paddingTop: "30px"}} >
                {mapsData ? (
                    <MapContainer/>
                ) : <p>Loading map...</p> }
            </div>
           
        </main>
    )
  
};

export default Map;