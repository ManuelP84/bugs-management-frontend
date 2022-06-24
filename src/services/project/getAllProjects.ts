import { createAsyncThunk } from "@reduxjs/toolkit"
import { projectType } from "../../state/slice/projectSlice"

const PATH = 'https://localhost:8080/v1/api/projects'

export const getAllProjects = createAsyncThunk('getAllProjects', async () => {
    const response = await fetch(PATH)
    return (await response.json() as projectType[])
})