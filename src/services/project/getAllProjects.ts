import { createAsyncThunk } from "@reduxjs/toolkit"
import { IUser } from "../../state/slice/loginSlice";
import { projectType } from "../../state/slice/projectSlice"

// const LOCALPATH = 'https://bugs-management-api.herokuapp.com/v1/api/projects'
const PATH = 'https://bugs-management-api.herokuapp.com/v1/api/projects'

export const getAllProjects = createAsyncThunk('getAllProjects', async (user: IUser) => {
    const response = await fetch(PATH)
    const retrievedProjects = await response.json() as projectType[]
    return ({ retrievedProjects, user })
})