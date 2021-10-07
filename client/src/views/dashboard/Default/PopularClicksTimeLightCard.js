import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

import axios from "axios";

/* Redux imports */
import { useSelector, useDispatch } from 'react-redux';
import { actions } from "../../../reducers/popularTimesForClicksDataReducer";

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import PopularTimeCard from 'ui-component/cards/Skeleton/PopularTimeCard';

// assets
import AccessTimeTwoToneIcon from "@material-ui/icons/AccessTimeFilledTwoTone";

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            borderRadius: '50%',
            top: '-30px',
            right: '-180px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
            borderRadius: '50%',
            top: '-160px',
            right: '-130px'
        }
    },
    content: {
        padding: '16px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark
    },
    secondary: {
        color: theme.palette.grey[500],
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));

const clicksUrl = "http://localhost:5555/dashboard/charts/clicks/popular-time/monthly";


// ===========================|| DASHBOARD - POPULAR CLICKS TIME LIGHT CARD ||=========================== //

const PopularClicksTimeLightCard = ({ isLoading }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    /* Access redux store */
    const popularTimeForClicks = useSelector(state => state.popularTimeForClicks.data);

    /* useCallback hook used to memoize previously fetched resuts. 
    When urlParams prop changes, function is called again to render Table component */
    const fetchPopularTime = useCallback(async () => {
        try {
            const response = await axios.get(clicksUrl);
            if (response.status === 200) {
                // Call action defined in clickChartDataReducer which matches current timeValue
                dispatch(actions.monthly(response.data))            
            } else {
                dispatch(actions.chartError(response.status))
            }
        } catch (error) {
            dispatch(actions.chartError(error))
        }
    }, [dispatch]);

    useEffect(fetchPopularTime, [ fetchPopularTime ]);


    return (
        <>
            {isLoading ? (
                <PopularTimeCard />
            ) : (
                <MainCard className={classes.card} contentClass={classes.content}>
                    <List className={classes.padding}>
                        <ListItem alignItems="center" disableGutters className={classes.padding}>
                            <ListItemAvatar>
                                <Avatar variant="rounded" className={classes.avatar}>
                                    <AccessTimeTwoToneIcon fontSize="inherit" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{
                                    mt: 0.45,
                                    mb: 0.45
                                }}
                                className={classes.padding}
                                primary={
                                    <Typography variant="h4">
                                        {popularTimeForClicks && popularTimeForClicks}
                                    </Typography>}
                                secondary={
                                    <Typography variant="subtitle2" className={classes.secondary}>
                                        This month's most popular time of day for <span style={{fontWeight: "bold"}}>clicks</span>
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </MainCard>
            )}
        </>
    );
};

PopularClicksTimeLightCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularClicksTimeLightCard;
