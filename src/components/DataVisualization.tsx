import {
    Button,
    CircularProgress,
    Container,
    createStyles,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Theme
} from "@material-ui/core";
import React from "react";
import {connect, useDispatch} from "react-redux";
import {RootState} from "../app/rootReducer";
import {Dispatch} from "redux";
import {
    getGranularity,
    GranularityValues,
    loadOlapData,
    OlapDataState,
    reset,
    resetOnlyData,
    setFrom,
    setGranularity,
    setTo
} from "../redux/OlapData";
import {CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from "recharts";
import randomColor from "randomcolor";
import clsx from "clsx";
import DateUtils from '@date-io/moment';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

const colorMap = new Map<string, string>();
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    granularity: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    submit: {
        '& > *': {
            margin: theme.spacing(1),
        }
    }
}));


const DataVisualization: React.FC<OlapDataState> = (props) => {
    const classes = useStyles();
    const dispatch: Dispatch = useDispatch();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    const lines = () => {
        return [...Array.from(new Set(props.data.map(_ => _.zone)))].map(e => {
            const values = props.data.filter(_ => _.zone === e).map(fact => {
                return {x: fact.period, y: fact.value}
            });


            console.log(colorMap);
            let color = colorMap.get(e);
            if (color === undefined) {
                color = randomColor();
                colorMap.set(e, color)
            }

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
            <div>
                <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateUtils}>
                        <Container maxWidth="sm">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="DD/MM/YYYY"
                                margin="normal"
                                id="from"
                                label="From"
                                value={props.from}
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
                                format="DD/MM/YYYY"
                                margin="normal"
                                id="to"
                                label="To"
                                value={props.to}
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
                </FormControl>
                <Container maxWidth="sm">
                    <InputLabel id="granularity-input-label">Granularity</InputLabel>
                    <Select
                        className={classes.granularity}
                        labelId="granularity-input-label"
                        id="granularity-input-select"
                        value={props.granularity}
                        onChange={e => {
                            if (e !== undefined) {
                                const {value} = e.target;
                                if (typeof value === "string") {
                                    dispatch(setGranularity(getGranularity(value)))
                                }

                            }
                        }}
                    >
                        {GranularityValues.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                    </Select>
                </Container>
                <Container className={classes.submit} maxWidth={"md"}>
                    <Button variant="contained" onClick={() => dispatch(reset())}>Reset</Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        const zones = [...Array.from(new Set(props.data.map(_ => _.zone)))];
                        dispatch(resetOnlyData());

                        zones.forEach(z => dispatch(loadOlapData({
                            from: props.from,
                            to: props.to,
                            granularity: props.granularity,
                            zone: z
                        })))
                    }}>
                        Reload
                    </Button>
                </Container>
            </div>
        )
    };

    return (
        <div>
            <h1>OLAP</h1>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={8}>
                        <Paper className={fixedHeightPaper}>
                            {chart()}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
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