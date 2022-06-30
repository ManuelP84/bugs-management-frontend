import { createSlice } from "@reduxjs/toolkit";
import { taskType } from "./taskSlice";

interface initialStateType {
    task: taskType,
}

const initialState: initialStateType = {
    task: {
        id: "",
        projectId: "",
        taskId: "",
        projectName: "",
        name: "",
        date: "",
        endDate: "",
        labels: [],
        description: "",
        urls: [],
        state: "",
        developerEmails: [],
    }
}

const tempTaskSlice = createSlice({
    name: 'tempTask',
    initialState,
    reducers: {
        addTempTask(state, action) {
            state.task = action.payload
        }
    }
})

export default tempTaskSlice.reducer
export const { addTempTask } = tempTaskSlice.actions

