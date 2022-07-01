import { createAsyncThunk } from "@reduxjs/toolkit"
import { IUser } from "../../state/slice/loginSlice"
import { projectType } from "../../state/slice/projectSlice"

// const LOCALPATH = 'https://bugs-management-api.herokuapp.com/v1/api/save/project'
const PATH = 'https://bugs-management-api.herokuapp.com/v1/api/save/project'

type paramsType = {
    project: projectType,
    user: IUser
}

export const createProject = createAsyncThunk('createProject', async (data: paramsType) => {
    const { project, user } = data
    const response = await fetch(PATH, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(project),
    })
    const createdProject = await response.json()
    return ({ project: createdProject, user: user });
})