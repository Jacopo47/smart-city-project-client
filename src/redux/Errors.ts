import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrorState {
    isLoading: boolean
    errors: String[]

}


const initialState: ErrorState = { isLoading: false, errors: [] };

const errorSlice = createSlice({
    name: 'errorState',
    initialState,
    reducers: {
        clear(state): void {
            state = initialState
        }
    }
});

export const {
    clear
} = errorSlice.actions;

export default errorSlice.reducer