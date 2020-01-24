import {Container, createStyles, Grid, makeStyles, Paper, Theme} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import DeviceMap from "./DeviceMap";
import LatestErrors from "./LatestErrors";
import {useDispatch} from "react-redux";
import {loadErrors} from "../redux/Errors";
import {loadSensorInfo} from "../redux/SensorInformation";
import WebSocketClient from "./WebSocketClient";
import DataVisualization from "./DataVisualization";
import {SnackbarProvider} from "notistack";
import {SnackbarUtilsConfigurator} from "./SnackBar";
import {loadConsumerGroupData} from "../redux/ConsumerGroupInfo";
import ConsumerGroup from "./ConsumerGroup";


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
    setTimeout(() => {
        //Periodically updated
        dispatch(loadConsumerGroupData());
    }, 10000);

    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}>
            <SnackbarUtilsConfigurator/>
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
                                <DataVisualization/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <ConsumerGroup/>
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
                <WebSocketClient/>
            </div>
        </SnackbarProvider>
    )
};


export default Dashboard