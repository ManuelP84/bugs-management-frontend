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
    actualTask: {
        id: '62bce75077d284243d4b3e42',
        projectId: '4888037',
        taskId: '1',
        projectName: 'Project name 4888037 test ',
        name: 'Task name 1-4888037 test',
        date: '2022-07-06',
        endDate: '2022-07-08',
        labels: [
            {
                label: 'label 1-4888037'
            },
            {
                label: 'label 2-4888037'
            },
            {
                label: 'label 3-4888037'
            }
        ],
        description: 'Task description 1-4888037 test',
        urls: [
            {
                url: 'url1',
                fileName: 'file name 1-4888037'
            },
            {
                url: 'url2',
                fileName: 'file name 2-4888037'
            },
            {
                url: 'url3',
                fileName: 'file name 3-4888037'
            }
        ],
        state: 'Task state 1-4888037 test',
        developerEmails: [
            {
                email: 'devemail1@email1.com'
            },
            {
                email: 'devemail2@email2.com'
            },
            {
                email: 'devemail3@email3.com'
            }
        ]
    },
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