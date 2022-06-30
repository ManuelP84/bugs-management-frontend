import { createAsyncThunk } from "@reduxjs/toolkit"
import { projectType } from "../../state/slice/projectSlice"

// const LOCALPATH = 'https://bugs-management-api.herokuapp.com/v1/api/projects'
const PATH = 'https://bugs-management-api.herokuapp.com/v1/api/projects'

export const getAllProjects = createAsyncThunk('getAllProjects', async () => {
    const response = await fetch(PATH)
    return (await response.json() as projectType[])
})