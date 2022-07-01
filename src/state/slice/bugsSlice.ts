import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { possibleStatus } from "../../config/possibleStatus"
import { errorInState } from "../../config/stateData"
import { deleteBugThunk, getBugsByTaskIdThunk, postBugThunk, updateBugThunk } from "../../services/bugsServices"
import { RootState } from "../store"
import { taskType } from "./taskSlice"

export interface IUrl {
    id?: string,
    fileName?: string,
    url: string,
}
export interface IBug {
    id?: string
    bugId: string
    title: string
    description: string
    date: string
    testerEmail: string
    taskId: string
    projectId: string
    testerNotes: string
    lifecycle: string
    urls?: IUrl[]
    scope: string
    priority: string
    importance: string
    state: string
    conclusions: string
    problems: string
    reference: string
    endDate?: string
    developerEmail: string
    developerNotes: string
}

export interface BugState {
    bugs: IBug[],
    actualBug: IBug | null,
    actualTask: taskType | null,
    status: possibleStatus,
    error: string | null,
}

const initialState: BugState = {
    bugs: [],
    actualBug: null,
    actualTask: null,
    status: possibleStatus.IDLE,
    error: null,
}

const bugSlice = createSlice({
    name: "bug",
    initialState,
    reducers: {
        addActualBug(state:BugState, action: PayloadAction<IBug>) {
            state.actualBug = action.payload
        }
    },
    extraReducers: (builder) => {
        //POST 
        builder.addCase(postBugThunk.pending, (state) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(postBugThunk.fulfilled, (state, action) => {
            state.status = possibleStatus.COMPLETED;
            state.bugs.push(action.payload);
        })
        builder.addCase(postBugThunk.rejected, (state, action) => {
            const message = action.error.message;
            state.status = possibleStatus.FAILED
            if (message) {
                state.error = errorInState(message)
            }
        })
        //GET by taskId
        builder.addCase(getBugsByTaskIdThunk.pending, (state, action) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(getBugsByTaskIdThunk.fulfilled, (state, action) => {
            state.bugs = action.payload
            state.status = possibleStatus.COMPLETED
        })
        builder.addCase(getBugsByTaskIdThunk.rejected, (state, action) => {
            const message = action.error.message;
            state.status = possibleStatus.FAILED
            if (message) {
                state.error = errorInState(message)
            }
        })
        //PUT
        builder.addCase(updateBugThunk.pending, (state, action) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(updateBugThunk.fulfilled, (state, action) => {
            const newState = [...state.bugs.map(bug => bug.id === action.payload.id ? action.payload : bug)]
            state.bugs = newState
            state.status = possibleStatus.COMPLETED
        })
        builder.addCase(updateBugThunk.rejected, (state, action) => {
            const message = action.error.message;
            state.status = possibleStatus.FAILED
            if (message) {
                state.error = errorInState(message)
            }
        })
        //DELETE by id
        builder.addCase(deleteBugThunk.pending, (state, action) => {
            state.status = possibleStatus.PENDING;
        })
        builder.addCase(deleteBugThunk.fulfilled, (state, action) => {
            state.status = possibleStatus.COMPLETED;
            if (action.payload.deleted) {
                state.bugs = state.bugs.filter((bug) =>
                    bug.bugId != action.payload.bugId)
            }
        })
        builder.addCase(deleteBugThunk.rejected, (state, action) => {
            const message = action.error.message;
            state.status = possibleStatus.FAILED
            if (message) {
                state.error = errorInState(message)
            }
        })
    }
})


export default bugSlice.reducer

export const selectBugsState = () => (state: RootState) => state.bugs.bugs
export const selectBugsStatus = () => (state: RootState) => state.bugs.status
export const selectBugsFetchError = () => (state: RootState) => state.bugs.error