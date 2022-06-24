import { createSlice } from "@reduxjs/toolkit"
import { getAllProjects } from "../../services/project/getAllProjects"
import { RootState } from "../store"
import { possibleStatus } from "../../config/possibleStatus"

type projectType = {
    id?: string,
    projectId?: number,
    name: string,
    startDate: string,
    endDate?: string,
    developerEmails: string[],
    leaderEmails: string[],
    description: string
}

type projectStateType = {
    projects: projectType[],
    status: possibleStatus,
    error: null
}

const initialState: projectStateType = {
    projects: [],
    status: possibleStatus.IDLE,
    error: null
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProjects.pending, (state, action) => {
        })
    }
})

export type { projectType }
export default projectSlice.reducer

export const selectProjectsState = () => (state: RootState) => state.projects.projects
export const selectProjectsStatus = () => (state: RootState) => state.projects.status
export const selectProjectsFetchError = () => (state: RootState) => state.projects.error