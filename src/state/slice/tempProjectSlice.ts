import { createSlice } from "@reduxjs/toolkit";
import { projectStateEnum, projectType } from "./projectSlice";

interface initialStateType {
    project: projectType,
}

const initialState: initialStateType = {
    project:{
        id: "",
        projectId: 0,
        name: "",
        startDate: "",
        endDate: "",
        developerEmails: [],
        leaderEmails: [],
        description: "",
        state: projectStateEnum.IDLE
    }
}

const tempProjectSlice = createSlice({
    name: 'tempProject',
    initialState,
    reducers: {
        addTempProject(state,action){
            state.project = action.payload
        }
    }
})

export default tempProjectSlice.reducer
export const {addTempProject} = tempProjectSlice.actions

