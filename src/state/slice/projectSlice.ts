import { createSlice } from "@reduxjs/toolkit"
import { getAllProjects } from "../../services/project/getAllProjects"
import { createProject } from "../../services/project/createProject"
import { RootState } from "../store"
import { possibleStatus } from "../../config/possibleStatus"
import { updateProject } from "../../services/project/updateProject"
import { deleteProject } from "../../services/project/deleteProject"

enum projectStateEnum {
    CREATED = "CREATED",
    ACTIVE = "ACTIVE",
    IDLE = "IDLE",
    CANCELLED = "CANCELLED",
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

        // GET cases
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

        // POST cases
        builder.addCase(createProject.fulfilled, (state, action) => {
            state.status = possibleStatus.COMPLETED
            state.projects.push(action.payload)
        })
        builder.addCase(createProject.pending, (state, action) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(createProject.rejected, (state, action) => {
            state.projects = []
            state.status = possibleStatus.FAILED;
            state.error = "Something went wrong while creating the project";
        })

        // PUT cases
        builder.addCase(updateProject.pending, (state, action) => {
            state.status = possibleStatus.PENDING
        })
        builder.addCase(updateProject.fulfilled, (state, action) => {
            state.status = possibleStatus.COMPLETED
            let projectsAfterUpdate = state.projects.map(project => {
                if (project.id === action.payload.id) {
                    return action.payload
                }
                return project
            })

            state.projects = projectsAfterUpdate
        })
        builder.addCase(updateProject.rejected, (state, action) => {
            state.status = possibleStatus.FAILED
            state.error = "Something went wrong while updating the project"
        })

        // DELETE
        builder.addCase(deleteProject.pending, (state, action) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            state.status = possibleStatus.COMPLETED
            if (action.payload.status) {
                state.projects = state.projects.filter((project) =>
                    project.id !== action.payload.id)
            }
        })
        builder.addCase(deleteProject.rejected, (state, action) => {
            state.status = possibleStatus.FAILED;
            state.error = "Something went wrong while deleting the project";
        })
    }
})

export type { projectType }
export { projectStateEnum }
export default projectSlice.reducer

export const selectProjectsState = () => (state: RootState) => state.projects.projects
export const selectProjectsStatus = () => (state: RootState) => state.projects.status
export const selectProjectsFetchError = () => (state: RootState) => state.projects.error