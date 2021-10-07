import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

import axios from "axios";

/* Redux imports */
import { useSelector, useDispatch } from 'react-redux';
import { actions } from "../../../reducers/impressionChartDataReducer";

/* Material-UI imports */
import { makeStyles } from '@material-ui/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import AccessTime from "@material-ui/icons/AccessTime";

/* Components imports */
import MainCard from 'ui-component/cards/MainCard';
import PopularTimeCard from 'ui-component/cards/Skeleton/PopularTimeCard';

/* Style constant */
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.light,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            borderRadius: '50%',
            top: '-30px',
            right: '-180px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
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
        backgroundColor: theme.palette.primary[800],
        color: '#fff'
    },
    primary: {
        color: '#fff'
    },
    secondary: {
        color: theme.palette.primary.light,
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));

const impressionsUrl = "http://localhost:5555/dashboard/charts/impressions/popular-time/monthly";

// ===========================|| DASHBOARD - POPULAR IMPRESSIONS TIME DARK CARD ||=========================== //

const PopularImpressionsTimeDarkCard = ({ isLoading }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    /* Access redux store */
    const popularTimeForImpressions = useSelector(state => state.impressionChartData.data);

    /* useCallback hook used to memoize previously fetched resuts. 
    When urlParams prop changes, function is called again to render Table component */
    const fetchPopularTime = useCallback(async () => {
        try {
            const response = await axios.get(impressionsUrl);
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
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <List className={classes.padding}>
                        <ListItem alignItems="center" disableGutters className={classes.padding}>
                            <ListItemAvatar>
                                <Avatar variant="rounded" className={classes.avatar}>
                                    <AccessTime fontSize="inherit" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                className={classes.padding}
                                sx={{
                                    mt: 0.45,
                                    mb: 0.45
                                }}
                                primary={
                                    <Typography variant="h4" className={classes.primary}>
                                        {popularTimeForImpressions && popularTimeForImpressions}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="subtitle2" className={classes.secondary}>
                                        This month's most popular time of day for <span style={{fontWeight: "bold"}}>impressions</span>
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

PopularImpressionsTimeDarkCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularImpressionsTimeDarkCard;
