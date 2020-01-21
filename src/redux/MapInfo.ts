import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {SensorRead} from "../model/SensorRead";


export interface Viewport {
    latitude: number,
    longitude: number,
    zoom: number,
    bearing: number,
    pitch: number
}


export interface MapInfoState {
    viewport: Viewport
    popupInfo: SensorRead | null
}

export const initialViewport: Viewport = {
    latitude: 44.22,
    longitude: 12.05,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
};
export const initialState: MapInfoState = { viewport: initialViewport, popupInfo: null };

const mapInfoSlice = createSlice({
    name: 'mapInfo',
    initialState,
    reducers: {
        updateViewport(state, action: PayloadAction<Viewport>): void {
            state.viewport = action.payload
        },
        setPopupInfo(state, action: PayloadAction<SensorRead | null>): void {
            state.popupInfo = action.payload
        }
    }
});

export const {
    updateViewport, setPopupInfo
} = mapInfoSlice.actions;

export default mapInfoSlice.reducer