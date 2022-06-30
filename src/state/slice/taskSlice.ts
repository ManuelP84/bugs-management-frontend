import { createSlice } from "@reduxjs/toolkit"
import { possibleStatus } from "../../config/possibleStatus"
import { createNewTask } from "../../services/Tasks/createNewTask";
import { deleteTask } from "../../services/Tasks/deleteTask";
import { getTasksByProjectId } from "../../services/Tasks/getTasksByProjectId";
import { updateTask } from "../../services/Tasks/UpdateTask";
import { RootState } from "../store";

type labelType = {
    label: String,
}

type urlType = {
    fileName: string,
    url: string,
}

type emailType = {
    email: String,
}

type taskType = {
    id?: String,
    projectId: String,
    taskId: String,
    projectName: String,
    name: String,
    date: String,
    endDate?: String,
    labels: labelType[],
    description: String,
    urls?: urlType[],
    state: String,
    developerEmails: emailType[],
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

    },
    extraReducers: (builder) => {
        //POST 
        builder.addCase(createNewTask.pending, (state,action) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(createNewTask.fulfilled, (state,action) => {
            state.status = possibleStatus.COMPLETED;
            state.tasks.push(action.payload);
        })
        builder.addCase(createNewTask.rejected, (state,action) => {
            state.status = possibleStatus.FAILED;
            state.error = "Something went wrong posting a new task";
            state.tasks = [];
        })
        //GET by projectId
        builder.addCase(getTasksByProjectId.pending, (state, action) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(getTasksByProjectId.fulfilled, (state, action) => {
            state.status = possibleStatus.COMPLETED;
            state.tasks = action.payload;
        })
        builder.addCase(getTasksByProjectId.rejected, (   state, action) => {
            state.status = possibleStatus.FAILED;
            state.error = "Something went wrong fetching the tasks";
            state.tasks = [];
        })
        //PUT
        builder.addCase(updateTask.pending, (state,action) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(updateTask.fulfilled, (state,action) => {
            state.status = possibleStatus.COMPLETED;
            let taskUpdated = state.tasks.filter(task => task.id === action.payload.id)[0];
            let positionTaskUpdated = state.tasks.indexOf(taskUpdated)
            state.tasks[positionTaskUpdated] = action.payload
        })
        builder.addCase(updateTask.rejected, (state,action) => {
            state.status = possibleStatus.FAILED;
            state.error = "Something went wrong updating a task";
            state.tasks = [];
        })
        //DELETE by id
        builder.addCase(deleteTask.pending, (state,action) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(deleteTask.fulfilled, (state,action) => {
            state.status = possibleStatus.COMPLETED;
            if (action.payload.deleted) {
                state.tasks = state.tasks.filter((task) => 
                task.id !== action.payload.taskId)
            }
        })
        builder.addCase(deleteTask.rejected, (state,action) => {
            state.status = possibleStatus.FAILED;
            state.error = "Something went wrong posting a new task";
        })
    }
})

export type { urlType, labelType, emailType, taskType, initialStateType }
export default taskSlice.reducer

export const selectTasksState = () => (state: RootState) => state.tasks.tasks
export const selectTasksStatus = () => (state: RootState) => state.tasks.status
export const selectTasksFetchError = () => (state: RootState) => state.tasks.error