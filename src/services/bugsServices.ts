import { createAsyncThunk } from "@reduxjs/toolkit"
import { ENDPOINT, HEADERS, HttpMethod } from "../config/stateData"
import { IBug } from "../state/slice/bugsSlice"
import { IUser } from "../state/slice/loginSlice"

export const getBugsByTaskIdThunk = createAsyncThunk("get/bugs", async (id: string) => {
    const response = await fetch(`${ENDPOINT}/v1/api/get/bugs/${id}`)
    const bugs = await response.json()
    
    return bugs as IBug[]
})

export const postBugThunk = createAsyncThunk("post/bug", async (bug: IBug) => {
    const response = await fetch(`${ENDPOINT}/v1/api/save/bug`, {
        method: HttpMethod.POST,
        headers: HEADERS,
        body: JSON.stringify(bug)
    })
    const data = await response.json();

    return data as IBug
})

export const updateBugThunk = createAsyncThunk("update/bug", async (bug: IBug) => {
    const response = await fetch(`${ENDPOINT}/v1/api/update/bug`, {
        method: HttpMethod.PUT,
        headers: HEADERS,
        body: JSON.stringify(bug)
    })
    const result = await response.json()
    console.log(result);
    
    return result as IBug
})

export const deleteBugThunk = createAsyncThunk('delete/bug', async (id: string) => {
    const response = await fetch(`${ENDPOINT}/v1/api/delete/bug/${id}`, {
        method: 'DELETE'
    })
    return {deleted: response.ok, bugId: id}
})

export const getAllUsersHelper = async () => {
    const users= await (await fetch(`${ENDPOINT}/v1/api/users`)).json()    
    return users as IUser[]
}

export const getUserByEmail = async (email: string) => {
    const response = await fetch(`${ENDPOINT}/v1/api/get/user/${email}`)    
    if (getAllUsersHelper.length == 0) {
        return {
            userEmail: "NoUser",
            userToken: "NoUser",
            userRol: "Admin",
            userImage: "",
            userName: ""
        } as IUser
    }
    else if (response.ok) {
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
