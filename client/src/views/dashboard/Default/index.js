import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import { daily, weekly, monthly } from "../../../reducers/clickChartDataReducer";

/* Material-UI styles imports */
import { Grid } from '@material-ui/core';

/* Components imports */
import TotalEventsLineChartCard from './TotalEventsLineChartCard';
import PopularLocationsCard from './PopularLocationsCard';
import TotalClicksLineChartCard from './TotalClicksLineChartCard';
import PopularImpressionsTimeDarkCard from './PopularImpressionsTimeDarkCard';
import PopularClicksTimeLightCard from './PopularClicksTimeLightCard';
import TotalRevenueAndClicksBarChart from './TotalRevenueAndClicksBarChart';
import MapContainer from '../Map/MapContainer';

import { gridSpacing } from 'store/constant';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const dispatch = useDispatch();

    // const today = useSelector(state => state.clickChartData);

    // console.log('daily', today)

    // const fetchDashboardData = useCallback(async () => {
    //     try {
    //         const promise1 = axios.get("http://localhost:5555/dashboard/charts/clicks");
    //         const promise2 = axios.get("https://randomuser.me/api?page=2");
    //         const promise3 = axios.get("https://randomuser.me/api?page=3");
            
    //         Promise.all([promise1, promise2, promise3]).then(function(response) {
    //           dispatch(daily(response[0]));
    //         });            
    //     } catch (error) {
    //         console.log('err')
    //     }
    // }, []);

    useEffect(() => {
        // fetchDashboardData();
    })

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalEventsLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalClicksLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <PopularImpressionsTimeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <PopularClicksTimeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalRevenueAndClicksBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularLocationsCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>            
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                    <MapContainer />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
