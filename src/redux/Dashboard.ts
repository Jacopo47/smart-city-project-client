import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum DashboardComponents {
    Dashboard = 'Dashboard'
}

export interface DashboardState {
    selectedComponent: DashboardComponents
    isOpen: boolean
}


export const initialState: DashboardState = { selectedComponent: DashboardComponents.Dashboard, isOpen: false };

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        changeComponent(state, action: PayloadAction<DashboardComponents>): void {
            state.selectedComponent = action.payload
        },
        openDrawer(state): void {
            state.isOpen = true
        },
        closeDrawer(state): void {
            state.isOpen = false
        }
    }
});

export const {
    changeComponent, openDrawer, closeDrawer
} = dashboardSlice.actions;

export default dashboardSlice.reducer