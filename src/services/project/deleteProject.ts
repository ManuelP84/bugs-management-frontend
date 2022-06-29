import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectType } from "../../state/slice/projectSlice";

// const LOCALPATH = "https://bugs-management-api.herokuapp.com/v1/api/delete/project/"
const PATH = "https://bugs-management-api.herokuapp.com/v1/api/delete/project/"

export const deleteProject = createAsyncThunk('deleteProject', async (project: projectType) => {
    const response = await fetch(PATH + `${project.id}`, {
        method: 'DELETE'
    })
    return { status: response.ok, id: project.id };
})