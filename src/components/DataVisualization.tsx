import {CircularProgress, createStyles, makeStyles, Theme} from "@material-ui/core";
import React from "react";
import {connect, useDispatch} from "react-redux";
import {RootState} from "../app/rootReducer";
import {Dispatch} from "redux";
import {OlapDataState} from "../redux/OlapData";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";


export const useStyles = makeStyles((theme: Theme) => createStyles({}));


const DataVisualization: React.FC<OlapDataState> = (props) => {
    const classes = useStyles();
    const dispatch: Dispatch = useDispatch();

    const chart = () => {
        return (
            <LineChart width={600} height={300} data={props.data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="period"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        );
    };

    return (
        <div>
            {
                props.data.length === 0 ? null :
                    (
                        <div>
                            {props.isLoading ? <CircularProgress/> : chart}
                        </div>
                    )
            }
        </div>
    )
};


const mapStateToProps = (state: RootState) => state.olap;

export default connect(mapStateToProps)(DataVisualization)