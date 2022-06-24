import { createAsyncThunk } from "@reduxjs/toolkit"
import { projectType } from "../../state/slice/projectSlice"

const PATH = 'https://...'

export const getAllProjects = createAsyncThunk('getAllProjects', async () => {
})