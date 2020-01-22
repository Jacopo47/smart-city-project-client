import {CircularProgress, createStyles, makeStyles, Theme} from "@material-ui/core";
import React from "react";
import {connect, useDispatch} from "react-redux";
import {RootState} from "../app/rootReducer";
import {Dispatch} from "redux";
import {OlapDataState} from "../redux/OlapData";
import {CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis} from "recharts";
import randomColor from "randomcolor";


export const useStyles = makeStyles((theme: Theme) => createStyles({}));


const DataVisualization: React.FC<OlapDataState> = (props) => {
    const classes = useStyles();
    const dispatch: Dispatch = useDispatch();

    const data = () => {
        return props.data.map(e => {
            let ob: any = {
                zone: e.zone,
                period: e.period
            };
            ob[e.zone] = e.value;

            return ob;
        })
    };

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

    console.log(lines());


    return (
        <div>
            {props.isLoading ? <CircularProgress/> : props.data.length > 0 ?
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
            }
        </div>
    )
};


const mapStateToProps = (state: RootState) => state.olap;

export default connect(mapStateToProps)(DataVisualization)