import {Container, createStyles, Grid, makeStyles, Paper, Theme} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import DeviceMap from "./DeviceMap";
import LatestErrors from "./LatestErrors";
import LatestInformation from "./LatestInformation";
import {useDispatch} from "react-redux";
import {loadErrors} from "../redux/Errors";
import {loadSensorInfo} from "../redux/SensorInformation";
import WebSocketClient from "./WebSocketClient";


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
        height: 500,
    }
}));

const Dashboard: React.FC = () => {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const dispatch = useDispatch();
    dispatch(loadErrors());
    dispatch(loadSensorInfo());

    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <DeviceMap/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <LatestErrors/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <LatestInformation/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <WebSocketClient/>
        </div>
    )
};


export default Dashboard