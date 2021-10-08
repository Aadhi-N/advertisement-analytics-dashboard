import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';

import axios from "axios";

/* Redux imports */
import { useSelector, useDispatch } from 'react-redux';
import { actions } from "../../../reducers/revenueChartDataReducer";

/* Material-UI imports */
import { Grid, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';

/* Chart imports */
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import barChartData from './chart-data/total-revenue-bar-chart';

/* Components imports */
import Skeleton from 'ui-component/cards/Skeleton/TotalRevenueAndClicksBarChart.Skeleton';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';


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

const revenueUrl = "http://localhost:5555/dashboard/charts/revenue-and-clicks/";

// ===========================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||=========================== //

const TotalRevenueAndClicksBarChart = ({ isLoading }) => {
    const [value, setValue] = useState('daily');
    const theme = useTheme();

    const { primary } = theme.palette.text;
    const grey200 = theme.palette.grey[200];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;
    const grey500 = theme.palette.grey[500];

    const totalRevenueForTimeline = useSelector(state => state.revenueChartData.totalRevenueForTimeline);
    const xAxis = useSelector(state => state.revenueChartData.xAxis);
    const sumRevenue = useSelector(state => state.revenueChartData.sumRevenue);
    const sumClicks = useSelector(state => state.revenueChartData.sumClicks);
   
    console.log('totalRev', xAxis)

    const [timeValue, setTimeValue] = useState("daily");
    const dispatch = useDispatch();

    const handleChangeTime = (val) => {
        setTimeValue(val);
    };


    const fetchEventData = useCallback(async () => {
        try {
            const response = await axios.get(revenueUrl + timeValue);
            if (response.status === 200) {
                dispatch(actions.setTimeline(timeValue));
                dispatch(actions.chartData(response.data, timeValue));           
            } else {
                dispatch(actions.chartError(response.status))
            }
        } catch (error) {
            dispatch(actions.chartError(error))
        }
    }, [timeValue, dispatch]);

    useEffect(fetchEventData, [ timeValue, fetchEventData ]);

////////////
    useEffect(() => {
        const newChartData = {
            ...barChartData.options,
            colors: [primary200, primaryDark, secondaryMain, secondaryLight],
            series: [
                { data: sumRevenue }, // Revenue bar data
                { data: sumClicks } // Clicks line data 
            ],
            xaxis: {
                type: 'category',
                categories: xAxis,
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return "$" + value;
                      },
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light',
                y: {
                    formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                        if (seriesIndex === 0) {
                            return "$" + value
                        } else { return value }
                    }                    
                }
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        };

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
        }
    }, [primary200, primaryDark, secondaryMain, secondaryLight, primary, grey200, isLoading, grey500, xAxis, sumClicks, sumRevenue]);

    return (
        <>
            {isLoading ? (
                <Skeleton />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Total Revenue</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">${totalRevenueForTimeline}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value} onClick={() => handleChangeTime(option.value)}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...barChartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalRevenueAndClicksBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalRevenueAndClicksBarChart;
