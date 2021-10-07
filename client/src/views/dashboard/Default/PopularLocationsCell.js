import PropTypes from 'prop-types';

/* Material-UI imports */
import { makeStyles } from '@material-ui/styles';
import { Divider, Grid, Typography } from '@material-ui/core';

/* Style constant */
const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
}));


// ===========================|| DASHBOARD DEFAULT - POPULAR LOCATIONS DATA CELLS ||=========================== //

const PopularLocationsCell = ({ locationChartData, metricValue }) => {
    const classes = useStyles();

    const cells = locationChartData.map((poi) => (
        <>
        <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                                {poi.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        {poi.hasOwnProperty("revenue") ? `$${parseFloat(poi.revenue).toFixed(2)}` : (poi[metricValue])}
                                        
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
        </>
    ))

    return (
        <>
            {cells}
        </>
    );
};

PopularLocationsCell.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularLocationsCell;
