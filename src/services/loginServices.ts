import { createAsyncThunk } from "@reduxjs/toolkit"
import { ENDPOINT, HEADERS, HttpMethod } from "../config/stateDate"
import { IUser } from "../state/slice/loginSlice"

export const postUserThunk = createAsyncThunk("post/user", async (user: IUser) => {
    const response = await fetch(`${ENDPOINT}user`, {
        method: HttpMethod.POST,
        headers: HEADERS,
        body: JSON.stringify(user)
    })
    return (await response.json()) as IUser
})

export const deleteUserThunk = createAsyncThunk("delete/users", async (id: string) => {
    const response = await fetch(`${ENDPOINT}user/${id}`, {method: HttpMethod.DELETE})
    return {wasDelete: response.ok, userId: id}
})