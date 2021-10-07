import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
import axios from "axios";

/* Redux imports */
import { useSelector, useDispatch } from 'react-redux';
import { actions } from "../../../reducers/locationChartDataReducer";

/* Material-UI imports */
import { makeStyles } from '@material-ui/styles';
import { Avatar, Button, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@material-ui/core';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

/* Components Imports */
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import PopularLocationsCell from './PopularLocationsCell';
import { gridSpacing } from 'store/constant';

/* Style constant */
const useStyles = makeStyles((theme) => ({
    cardAction: {
        padding: '10px',
        paddingTop: 0,
        justifyContent: 'center'
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    successDark: {
        color: theme.palette.success.dark
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        color: theme.palette.orange.dark
    },
    buttonContainer: {
        backgroundColor: "rgb(254,248,227)",
    }
}));

const locationDataUrl = "http://localhost:5555/dashboard/charts/locations/total-";

// ===========================|| DASHBOARD DEFAULT - POPULAR LOCATIONS CARD ||=========================== //

const PopularLocationsCard = ({ isLoading }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const [timeValue, setTimeValue] = useState("daily");
    const [metricValue, setMetricValue] = useState("revenue");

    /* Access redux store */
    const locationChartData = useSelector(state => state.locationChartData.data);

    const fetchLocationData = useCallback(async () => {
        try {
            const response = await axios.get(`${locationDataUrl}${metricValue}/${timeValue}`);
            if (response.status === 200) {
                dispatch(actions.chartData(response.data))            
            } else {
                dispatch(actions.chartError(response.status))
            }
        } catch (error) {
            dispatch(actions.chartError(error))
        }
    }, [metricValue, timeValue, dispatch]);

    useEffect(fetchLocationData, [ timeValue, metricValue, fetchLocationData ]);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeTime = (e) => {
        setTimeValue(e.target.name);
    };

    const handleChangeMetric = (val) => {
        setMetricValue(val)
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Points of Interest: {metricValue.charAt(0).toUpperCase() + metricValue.slice(1)}</Typography>
                                        
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            className={classes.primaryLight}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={(e)=> {handleChangeMetric("revenue"); handleClose()}}> Revenue </MenuItem>
                                            <MenuItem onClick={(e)=> {handleChangeMetric("clicks"); handleClose()}}> Clicks </MenuItem>
                                            <MenuItem onClick={(e)=> {handleChangeMetric("impressions"); handleClose()}}> Impressions </MenuItem>
                                            <MenuItem onClick={(e)=> {handleChangeMetric("events"); handleClose()}}> Events </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item className={classes.buttonContainer}>
                                        <Button
                                            color="warning"
                                            disableElevation
                                            variant={timeValue === "daily" ? 'contained' : 'string'}
                                            size="small"
                                            name="daily"
                                            onClick={(e) => handleChangeTime(e)}
                                        >
                                            Today
                                        </Button>
                                        <Button
                                            color="warning"
                                            disableElevation
                                            variant={timeValue === "weekly" ? 'contained' : 'string'}
                                            size="small"
                                            name="weekly"
                                            onClick={(e) => handleChangeTime(e)}
                                        >
                                            This Week
                                        </Button>
                                        <Button
                                            color="warning"
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

                            <Grid item xs={12}>
                                <PopularLocationsCell locationChartData={locationChartData} metricValue={metricValue}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

PopularLocationsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularLocationsCard;
