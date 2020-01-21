import React from "react";
import {useDispatch} from "react-redux";
import {updateSensorInfo} from "../redux/SensorInformation";
import io from "socket.io-client"
import {addErrors} from "../redux/Errors";

const WebSocketClient: React.FC = () => {
    const dispatch = useDispatch();

    const socket = io('http://localhost:9092');

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