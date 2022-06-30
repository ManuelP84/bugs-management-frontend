import { createAsyncThunk } from "@reduxjs/toolkit"
import { dashboardBugType } from "../../state/slice/dashboardSlice"

// const LOCALPATH = 'http://localhost:8080/v1/api/projects'
const PATH = 'https://bugs-management-api.herokuapp.com/v1/api/'

export const getBugsByProjectId = createAsyncThunk('getBugsByProjectId', async () => {
    const response = await fetch(PATH)
    return (await response.json() as dashboardBugType[])
})