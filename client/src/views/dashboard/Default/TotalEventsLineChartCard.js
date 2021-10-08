import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import axios from "axios";

/* Redux imports */
import { useSelector, useDispatch } from 'react-redux';
import { actions } from "../../../reducers/eventChartDataReducer";

/* Components imports */
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalEventsCard from 'ui-component/cards/Skeleton/EarningCard';

/* Charts imports */
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

/* Chart data imports */
import totalEventsLineChart from './chart-data/total-events-line-chart';

/* Material-UI imports */
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Typography, Button } from '@material-ui/core';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';


/* Style Constant */
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&>div': {
            position: 'relative',
            zIndex: 5
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            zIndex: 1,
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: 1,
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        backgroundColor: theme.palette.secondary[800],
        color: '#fff',
        cursor: "default"
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.secondary[200]
    },
    avatarCircle: {
        ...theme.typography.smallAvatar,
        cursor: 'pointer',
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    }
}));

// API url
const eventsUrl = "http://localhost:5555/dashboard/charts/events/total-events/";


//= ==========================|| DASHBOARD DEFAULT - TOTAL EVENTS LINE CHART CARD ||===========================//

const TotalEventsLineChartCard = ({ isLoading }) => {
    const classes = useStyles();

    const [timeValue, setTimeValue] = useState("daily");
    const dispatch = useDispatch();

    /* Access redux store */
    const totalEvents = useSelector(state => state.eventChartData.eventChartData);
    const xAxis = useSelector(state => state.revenueChartData.xAxis);

    useEffect(() => {
        const newChartData = {
            ...totalEventsLineChart.options,
            series: [
                { data: [45, 66, 41, 89, 25, 44, 9, 54] },
            ],
            
        };

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`line-chart`, 'updateOptions', newChartData);
        }
    }, [isLoading, xAxis]);


    /* useCallback hook used to memoize previously fetched resuts. 
    When urlParams prop changes, function is called again to render Table component */
    const fetchEventData = useCallback(async () => {
        try {
            const response = await axios.get(eventsUrl + timeValue);
            if (response.status === 200) {
                // Call action defined in eventChartDataReducer which matches current timeValue
                dispatch(actions[timeValue](response.data))            
            } else {
                dispatch(actions.chartError(response.status))
            }
        } catch (error) {
            dispatch(actions.chartError(error))
        }
    }, [timeValue, dispatch]);

    useEffect(fetchEventData, [ timeValue, fetchEventData ]);

    const handleChangeTime = (e) => {
        setTimeValue(e.target.name);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonTotalEventsCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Avatar variant="rounded" className={classes.avatar}>
                                        <PhoneAndroid fontSize="inherit" />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="secondary"
                                        className={classes.button}
                                        disableElevation
                                        variant={timeValue === "daily" ? 'contained' : 'string'}
                                        size="small"
                                        name="daily"
                                        onClick={(e) => handleChangeTime(e)}
                                    >
                                        Today
                                    </Button>
                                    <Button
                                        color="secondary"
                                        disableElevation
                                        variant={timeValue === "weekly" ? 'contained' : 'string'}
                                        size="small"
                                        name="weekly"
                                        onClick={(e) => handleChangeTime(e)}
                                    >
                                        This Week
                                    </Button>
                                    <Button
                                        color="secondary"
                                        disableElevation
                                        variant={timeValue === "monthly" ? 'contained' : 'string'}
                                        size="small"
                                        name="monthly"
                                        onClick={(e) => handleChangeTime(e)}
                                    >
                                        This Month
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 0.75 }}>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography className={classes.cardHeading}>
                                                {totalEvents && totalEvents}
                                            </Typography>
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <Typography className={classes.subHeading}>Total Events</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Chart {...totalEventsLineChart} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalEventsLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalEventsLineChartCard;
