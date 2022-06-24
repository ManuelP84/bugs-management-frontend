import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    uid?: string
    userImage?: string
    userName?: string
    userEmail: string
    userToken: string
}

interface LoginState {
    user: User | null
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
        getUser: (state: LoginState, action: PayloadAction<User>) => (
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
