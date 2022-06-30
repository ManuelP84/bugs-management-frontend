import { createAsyncThunk } from "@reduxjs/toolkit"
import { IBug } from "../../state/slice/bugsSlice"
import { projectType } from "../../state/slice/projectSlice"

// const PATH = 'http://localhost:8080/v1/api/get/project/bugs/'
const PATH = 'https://bugs-management-api.herokuapp.com/v1/api/get/project/bugs/'

export const getBugsByProjectId = createAsyncThunk('getBugsByProjectId', async (relatedProject: projectType) => {
    const response = await fetch(PATH + relatedProject.projectId)
    return (await response.json() as IBug[])
})