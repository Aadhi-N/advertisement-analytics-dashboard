import PropTypes from 'prop-types';
import { useCallback, useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { setClicksData, setClicksDataError } from "../../../actions/tableDataActions";
// import { daily, weekly, monthly, chartError } from "../../../reducers/clickChartDataReducer";
import { actions } from "../../../reducers/clickChartDataReducer";

import axios from "axios";

/* Material-UI Styles imports */
import { makeStyles } from '@material-ui/styles';
import { Avatar, Button, Grid, Typography } from '@material-ui/core';

/* Charts imports */
import Chart from 'react-apexcharts';

/* Components imports */
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

/* Chart data imports */
import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

/* Assets imports */
import MouseOutlined from '@material-ui/icons/MouseOutlined';

/* Style constant */
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.primary.dark,
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
            background: theme.palette.primary[800],
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
            background: theme.palette.primary[800],
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
        backgroundColor: theme.palette.primary[800],
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
        color: theme.palette.primary[200]
    },
    avatarCircle: {
        ...theme.typography.smallAvatar,
        cursor: 'pointer',
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.primary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    }
}));

const clicksUrl = "http://localhost:5555/dashboard/charts/stats/total-clicks/";


// ===========================|| DASHBOARD - TOTAL CLICKS LINE CHART CARD ||=========================== //

const TotalClicksLineChartCard = ({ isLoading }) => {
    const classes = useStyles();

    const [timeValue, setTimeValue] = useState("daily");

    const dispatch = useDispatch();

    /* Access redux store */
    const totalClicks = useSelector(state => state.clickChartData.clickChartData);

    /* useCallback hook used to memoize previously fetched resuts. 
    When urlParams prop changes, function is called again to render Table component */
    const fetchTableData = useCallback(async () => {
        try {
            const response = await axios.get(clicksUrl + timeValue);
            if (response.status === 200) {
                // Call action defined in clickChartDataReducer which matches current timeValue
                dispatch(actions[timeValue](response.data))            
            } else {
                dispatch(actions.chartError(response.status))
            }
        } catch (error) {
            dispatch(actions.chartError(error))
        }
    }, [timeValue, dispatch]);

    useEffect(fetchTableData, [ timeValue, fetchTableData ]);

    const handleChangeTime = (e) => {
        setTimeValue(e.target.name);
    };
    
    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <>
                {/* {JSON.stringify(totalClicks)} */}
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Avatar variant="rounded" className={classes.avatar}>
                                        <MouseOutlined fontSize="inherit" />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Button
                                        disableElevation
                                        variant={timeValue === "daily" ? 'contained' : 'string'}
                                        size="small"
                                        name="daily"
                                        onClick={(e) => handleChangeTime(e)}
                                    >
                                        Today
                                    </Button>
                                    <Button
                                        disableElevation
                                        variant={timeValue === "weekly" ? 'contained' : 'string'}
                                        size="small"
                                        name="weekly"
                                        onClick={(e) => handleChangeTime(e)}
                                    >
                                        This Week
                                    </Button>
                                    <Button
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
                                                {totalClicks && totalClicks}
                                            </Typography>
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <Typography className={classes.subHeading}>Total Clicks</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
                </>
            )}
        </>
    );
};

TotalClicksLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalClicksLineChartCard;
