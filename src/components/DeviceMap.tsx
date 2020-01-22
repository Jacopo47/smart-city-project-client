import {createStyles, Fab, makeStyles, Theme} from "@material-ui/core";
import React from "react";
import {SensorRead} from "../model/SensorRead";
import MapGL, {FullscreenControl, Marker, NavigationControl, Popup} from 'react-map-gl';
import {connect, useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/rootReducer";
import {Dispatch} from "redux";
import {setPopupInfo, updateViewport, Viewport} from "../redux/MapInfo";
import moment, {Moment} from "moment";
import {SensorInfoState} from "../redux/SensorInformation";
import TimelineIcon from '@material-ui/icons/Timeline';
import {Granularity, loadOlapData} from "../redux/OlapData";
import {OlapParams} from "../model/OlapParams";




export const useStyles = makeStyles((theme: Theme) => createStyles({
    fullscreenControlStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '10px'
    },
    navStyle: {
        position: 'absolute',
        top: 36,
        left: 0,
        padding: '10px'
    },
    scaleControlStyle: {
        position: 'absolute',
        bottom: 36,
        left: 0,
        padding: '10px'
    }
}));

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

const getPins = (data: SensorRead[], onClick: (value: SensorRead) => void) => {
    return data.map(read => (
        <Marker key={read.id} longitude={read.coordinate.longitude} latitude={read.coordinate.latitude}>
            <svg
                height={SIZE}
                viewBox="0 0 24 24"
                style={{
                    cursor: 'pointer',
                    fill: '#2bdd1f',
                    stroke: 'none',
                    transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                }}
                onClick={() => onClick(read)}
            >
                <path d={ICON}/>
            </svg>
        </Marker>
    ));
};

const sensorInfo = (data: SensorRead, addZoneToChart: (zone: string) => void) => {
    return (
        <div>
            <div>
                <h4>{data.zone}</h4>
                <p>Time: {moment(data.dateTime).format('DD/MM/YY hh:mm')}</p>
                <p>Temperature: {data.temperature}</p>
                <p>Humidity: {data.humidity}</p>
            </div>
            <Fab variant="extended">
                <TimelineIcon onClick={() => addZoneToChart(data.zone)} />
                Show in chart
            </Fab>
        </div>
    )
};

const DeviceMap: React.FC<SensorInfoState> = (props) => {
    const classes = useStyles();

    const TOKEN: string = process.env.REACT_APP_MAP_KEY || 'NO_TOKEN';

    const viewport: Viewport = useSelector<RootState, Viewport>(state => state.mapInfo.viewport);
    const popupInfo: SensorRead | null = useSelector<RootState, SensorRead | null>(state => state.mapInfo.popupInfo);
    const dispatch: Dispatch = useDispatch();

    const getOlapQueryParams = (zone: string):OlapParams => {
        return {
            from: useSelector<RootState, Moment>(state => state.olap.from),
            to: useSelector<RootState, Moment>(state => state.olap.to),
            granularity: useSelector<RootState, Granularity>(state => state.olap.granularity),
            zone
        }
    };

    const _updateViewport = (viewport: any) => {
        dispatch(updateViewport(viewport))
    };

    const _onClickMarker = (data: SensorRead) => {
        dispatch(setPopupInfo(data))
    };

    const _renderPopup = () => {
        return (
            popupInfo && (
                <Popup
                    tipSize={5}
                    anchor="top"
                    longitude={popupInfo.coordinate.longitude}
                    latitude={popupInfo.coordinate.latitude}
                    closeOnClick={false}
                    onClose={() => dispatch(setPopupInfo(null))}
                >
                    {sensorInfo(popupInfo, zone => dispatch(loadOlapData(getOlapQueryParams(zone))))}
                </Popup>
            )
        );
    };

    return (
            <MapGL
                {...viewport}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={_updateViewport}
                mapboxApiAccessToken={TOKEN}
            >
                {getPins(props.data, _onClickMarker)}

                {_renderPopup()}

                <div className={classes.fullscreenControlStyle}>
                    <FullscreenControl/>
                </div>
                <div className={classes.navStyle}>
                    <NavigationControl/>
                </div>

            </MapGL>
    )
};



const mapStateToProps = (state: RootState) => state.sensor;

export default connect(mapStateToProps)(DeviceMap)