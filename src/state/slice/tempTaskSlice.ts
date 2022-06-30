import { createSlice } from "@reduxjs/toolkit";
import { taskType } from "./taskSlice";

interface initialStateType {
    task: taskType,
}

const initialState: initialStateType = {
    task: {
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
}

const tempProjectSlice = createSlice({
    name: 'tempProject',
    initialState,
    reducers: {
        addTempProject(state, action) {
            state.project = action.payload
        }
    }
})

export default tempProjectSlice.reducer
export const { addTempProject } = tempProjectSlice.actions

