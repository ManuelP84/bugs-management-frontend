import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { possibleStatus } from "../../config/possibleStatus"
import { getBugsByProjectId } from "../../services/dashboard/getBugsByProjectId";

type dashboardBugType = {
    id?: string,
    bugId?: number,
    taskId?: number,
    projectId?: string,
    state: string,
    lifecycle: string,
    startDate: string
}

type dashboardType = {
    bugs: dashboardBugType[],
    status: possibleStatus,
    error: string | null,
}

const initialState: dashboardType = {
    bugs: [],
    status: possibleStatus.IDLE,
    error: null
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        // GET cases
        builder.addCase(getBugsByProjectId.pending, (state, action) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(getBugsByProjectId.fulfilled, (state, action) => {
            state.status = possibleStatus.COMPLETED;
            state.bugs = action.payload
        })
        builder.addCase(getBugsByProjectId.rejected, (state, action) => {
            state.status = possibleStatus.FAILED;
            state.error = "Something went wrong fetching the bugs by project id"
            state.bugs = []
        })
    }
})

export type { dashboardBugType }
export default dashboardSlice.reducer

export const selectDashboardState = () => (state: RootState) => state.dashboard.bugs
export const selectDashboardStatus = () => (state: RootState) => state.dashboard.status
export const selectDashboardFetchError = () => (state: RootState) => state.dashboard.error