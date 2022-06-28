import { createSlice } from "@reduxjs/toolkit"
import { getAllProjects } from "../../services/project/getAllProjects"
import { createProject } from "../../services/project/createProject"
import { RootState } from "../store"
import { possibleStatus } from "../../config/possibleStatus"

enum projectStateEnum {
    CREATED = "CREATED",
    ACTIVE = "ACTIVE",
    IDLE = "IDLE",
    COMPLETED = "COMPLETED"
}

type projectType = {
    id?: string,
    projectId?: number,
    name: string,
    startDate: string,
    endDate?: string,
    developerEmails: string[],
    leaderEmails: string[],
    description: string,
    state: projectStateEnum
}

type projectStateType = {
    projects: projectType[],
    status: possibleStatus,
    error: string | null
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
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(getAllProjects.fulfilled, (state, action) => {
            state.status = possibleStatus.COMPLETED;
            state.projects = action.payload;
        })
        builder.addCase(getAllProjects.rejected, (state, action) => {
            state.status = possibleStatus.FAILED;
            state.error = "Something went wrong fetching the projects"
            state.projects = []
        })

        builder.addCase(createProject.fulfilled, (state, action) => {
            state.status = possibleStatus.COMPLETED
            state.projects.push(action.payload)
            console.log("On completed")
        })
        builder.addCase(createProject.pending, (state, action) => {
            state.status = possibleStatus.PENDING;
            console.log("On pending")
        })
        builder.addCase(createProject.rejected, (state, action) => {
            state.projects = []
            state.status = possibleStatus.FAILED;
            state.error = "Something went wrong creating a new project";
            console.log("On error")
        })
    }
})

export type { projectType }
export { projectStateEnum }
export default projectSlice.reducer

export const selectProjectsState = () => (state: RootState) => state.projects.projects
export const selectProjectsStatus = () => (state: RootState) => state.projects.status
export const selectProjectsFetchError = () => (state: RootState) => state.projects.error