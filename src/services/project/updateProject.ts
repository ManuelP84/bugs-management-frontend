import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectType } from "../../state/slice/projectSlice";

const PATH = 'http://localhost:8080/v1/api/update/project'

export const updateProject = createAsyncThunk('updateProject', async (project: projectType) => {
    const response = await fetch(PATH, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(project),
    })
    return (await response.json()) as projectType;
})