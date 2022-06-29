import { createAsyncThunk } from "@reduxjs/toolkit"
import { ENDPOINT, HEADERS, HttpMethod } from "../config/stateData"
import { IUser } from "../state/slice/loginSlice"

export const getAllUsersThunk = createAsyncThunk("get/users", async () => {
    const response = await fetch(`${ENDPOINT}user`)
    return (await response.json()) as IUser[]
})

export const postUserThunk = createAsyncThunk("post/user", async (user: IUser) => {
    const response = await fetch(`${ENDPOINT}/v1/api/save/user`, {
        method: HttpMethod.POST,
        headers: HEADERS,
        body: JSON.stringify(user)
    })
    const data = await response.json();

    return data as IUser
})

export const updateUserThunk = createAsyncThunk("update/user", async (user: IUser) => {
    const response = await fetch(`${ENDPOINT}/v1/api/update/user`, {
        method: HttpMethod.PUT,
        headers: HEADERS,
        body: JSON.stringify(user)
    })
    return (await response.json()) as IUser
})

export const getUserByEmail = async (email: string) => {
    const response = await fetch(`${ENDPOINT}/v1/api/get/user/${email}`)    
    if (response.ok) {
        return (await response.json()) as IUser
    }  
    return {
        userEmail: "NoUser",
        userToken: "NoUser",
        userRol: "Reader",
        userImage: "",
        userName: ""
    } as IUser
}