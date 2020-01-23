import {CircularProgress, Container, createStyles, Grid, makeStyles, Paper, Theme} from "@material-ui/core";
import React, {useState} from "react";
import {connect, useDispatch} from "react-redux";
import {RootState} from "../app/rootReducer";
import {Dispatch} from "redux";
import {OlapDataState, setFrom, setTo} from "../redux/OlapData";
import {CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from "recharts";
import randomColor from "randomcolor";
import DeviceMap from "./DeviceMap";
import LatestErrors from "./LatestErrors";
import clsx from "clsx";
import DateUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


export const useStyles = makeStyles((theme: Theme) => createStyles({
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


const DataVisualization: React.FC<OlapDataState> = (props) => {
    const classes = useStyles();
    const dispatch: Dispatch = useDispatch();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [selectedDate, handleDateChange] = useState(new Date());

    const lines = () => {
        return [...Array.from(new Set(props.data.map(_ => _.zone)))].map(e => {
            const values = props.data.filter(_ => _.zone === e).map(fact => {
                return {x: fact.period, y: fact.value}
            });

            const color = randomColor();
            return (
                <Scatter name={e} key={e} data={values} fill={color} line shape="circle"/>
            )
        })
    };

    const chart = () => {
        return props.isLoading ? <CircularProgress/> : props.data.length > 0 ?
            <ScatterChart width={600} height={400}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey={'x'} type="category" name="period" allowDuplicatedCategory={false}/>
                <YAxis dataKey={'y'} type="number" name='temperature' unit='°'/>
                <Legend/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                {lines()}
            </ScatterChart> : null
    };

    const input = () => {
        return (
            <MuiPickersUtilsProvider utils={DateUtils}>
                <Container maxWidth="sm">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="from"
                        label="From"
                        value={selectedDate}
                        onChange={e => {
                            if (e !== null) {
                                dispatch(setFrom(e))
                            }
                        }}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Container>
                <Container maxWidth="sm">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="to"
                        label="To"
                        value={selectedDate}
                        onChange={e => {
                            if (e !== null) {
                                dispatch(setTo(e))
                            }
                        }}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Container>
            </MuiPickersUtilsProvider>
        )
    }

    return (
        <div>
            <h1>OLAP</h1>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            {chart()}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            {input()}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
};


const mapStateToProps = (state: RootState) => state.olap;

export default connect(mapStateToProps)(DataVisualization)