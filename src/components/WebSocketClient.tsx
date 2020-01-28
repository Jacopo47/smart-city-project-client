import React from "react";
import {useDispatch} from "react-redux";
import {updateSensorInfo} from "../redux/SensorInformation";
import io from "socket.io-client"
import {addErrors} from "../redux/Errors";

const WebSocketClient: React.FC = () => {
    const dispatch = useDispatch();

    const endpoint = process.env.REACT_APP_WS_ENDPOINT || 'http://localhost:9092';

    const socket = io(endpoint);

    socket.on('sensor-read-update', (data: string) => {
        dispatch(updateSensorInfo(JSON.parse(data)))
    });

    socket.on('sensor-error-update', (data: string) => {
        dispatch(addErrors(JSON.parse(data)))
    });

    return (
        <div/>
    );

};


export default WebSocketClient