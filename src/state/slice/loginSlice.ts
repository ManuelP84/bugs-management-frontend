import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsersThunk } from "../../services/loginServices";

export interface IUser {
    uid?: string
    userImage?: string
    userName?: string
    userEmail: string
    userToken: string
    userRol: string
}

interface LoginState {
    user: IUser | null
    logged: boolean
}

const initialState: LoginState = {
    user: null,
    logged: false
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        getUser: (state: LoginState, action: PayloadAction<IUser>) => (
            {...state, user: action.payload}
        ),
        getLogged: (state: LoginState, action: PayloadAction<boolean>)  => (
             {...state, logged: action.payload} 
        ),
        logOut: (state: LoginState, action: PayloadAction<void>) => (
            {...initialState}
        )
    }
})
 
export const { getLogged, getUser, logOut } = loginSlice.actions
export default loginSlice.reducer
