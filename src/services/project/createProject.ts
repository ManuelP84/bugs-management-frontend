import { createAsyncThunk } from "@reduxjs/toolkit"
import { projectType } from "../../state/slice/projectSlice"

const PATH = 'http://localhost:8080/v1/api/save/project'

export const createProject = createAsyncThunk('createProject', async (project: projectType) => {
    const response = await fetch(PATH, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(project),
    })
    return (await response.json()) as projectType;
})