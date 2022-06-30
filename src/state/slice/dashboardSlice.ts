import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { possibleStatus } from "../../config/possibleStatus"
import { getBugsByProjectId } from "../../services/dashboard/getBugsByProjectId";
import { projectType } from "./projectSlice";
import { IBug } from "./bugsSlice";

type dashboardType = {
    bugs: IBug[],
    relatedProject?: projectType,
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
        loadRelatedProject(state, action) {
            return { ...state, relatedProject: action.payload }
        }
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

export default dashboardSlice.reducer

export const { loadRelatedProject } = dashboardSlice.actions

export const selectDashboardState = () => (state: RootState) => state.dashboard.bugs
export const selectDashboardStatus = () => (state: RootState) => state.dashboard.status
export const selectDashboardFetchError = () => (state: RootState) => state.dashboard.error