import { createSlice } from "@reduxjs/toolkit"
import { possibleStatus } from "../../config/possibleStatus"
import { RootState } from "../store";

type taskType = {
    id: String,
    projectId: String,
    taskId: String,
    projectName: String,
    name: String,
    date: String,
    endDate: String,
    labels: String[],
    description: String,
    urls: String[],
    state: String,
    developerEmails: String[],
}

interface initialStateType {
    tasks: taskType[],
    status: possibleStatus,
    error: string | null,
}

const initialState: initialStateType = {
    tasks: [],
    status: possibleStatus.IDLE,
    error: null,
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {

    }
})

export type { taskType, initialStateType }
export default taskSlice.reducer

export const selectTasksState = () => (state: RootState) => state.tasks.tasks
export const selectTasksStatus = () => (state: RootState) => state.tasks.status
export const selectTasksFetchError = () => (state: RootState) => state.tasks.error