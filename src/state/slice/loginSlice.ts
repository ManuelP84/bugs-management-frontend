import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onLog } from "firebase/app";
import { possibleStatus } from "../../config/possibleStatus";
import { errorInState, ErrorType } from "../../config/stateData";
import { getAllUsersThunk, postUserThunk, updateUserThunk } from "../../services/loginServices";
import { RootState } from "../store";

export interface IUser {
    uid?: string
    userImage?: string
    userName?: string
    userEmail: string
    userToken: string
    userRol?: string
}
/**/

interface LoginState {
    actualUser: IUser | null
    users: IUser[]
    status: possibleStatus
    error: ErrorType
    isLogged: boolean
}

const initialState: LoginState = {
    actualUser: null,
    users: [],
    isLogged: false,
    error: null,
    status: possibleStatus.IDLE
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        getLogged: (state: LoginState, action: PayloadAction<boolean>)  => (
             {...state, isLogged: action.payload} 
        ),
        logOut: (state: LoginState, action: PayloadAction<void>) => (
            {...initialState}
        )
    },
    extraReducers: (builder) => {
        //GET
        builder.addCase(getAllUsersThunk.pending, (state) => {
            state.status = possibleStatus.PENDING
        })
        builder.addCase(getAllUsersThunk.rejected, (state, action) => {
            const message = action.error.message;
            state.status = possibleStatus.FAILED
            if (message) {
                state.error = errorInState(message)
            }
        })
        builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
            state.users = action.payload
            state.status = possibleStatus.COMPLETED
        })
        //POST
        builder.addCase(postUserThunk.pending, (state) => {
            state.status = possibleStatus.PENDING
        })
        builder.addCase(postUserThunk.rejected, (state, action) => {
            const message = action.error.message;
            state.status = possibleStatus.FAILED
            if (message) {
                state.error = errorInState(message)
            }
        })
        builder.addCase(postUserThunk.fulfilled, (state, action) => {
            state.actualUser = action.payload
            state.status = possibleStatus.COMPLETED;
        })
        //UPDATE
        builder.addCase(updateUserThunk.pending, (state) => {
            state.status = possibleStatus.PENDING
        })
        builder.addCase(updateUserThunk.rejected, (state, action) => {
            const message = action.error.message;
            state.status = possibleStatus.FAILED
            if (message) {
                state.error = errorInState(message)
            }
        })
        builder.addCase(updateUserThunk.fulfilled, (state, action) => {
            state.users = { ...state.users.map( user => user.uid === action.payload.uid? action.payload : user)}
            state.status = possibleStatus.COMPLETED
        })
    }
})

export const selectUserList = () => (state: RootState) => state.login.users
export const selectLoginError = () => (state: RootState) => state.login.error
export const selectLoginStatus = () => (state: RootState) => state.login.status
export const { getLogged, logOut } = loginSlice.actions
export default loginSlice.reducer
