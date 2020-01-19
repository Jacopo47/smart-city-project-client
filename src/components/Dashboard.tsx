import {Container, createStyles, Grid, makeStyles, Paper, Theme} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import DeviceMap from "./DeviceMap";
import LatestErrors from "./LatestErrors";
import LatestInformation from "./LatestInformation";


export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    }
}));

const Dashboard: React.FC = () => {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <DeviceMap />
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <LatestErrors />
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <LatestInformation />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
};



export default Dashboard