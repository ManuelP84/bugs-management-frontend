import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectType } from "../../state/slice/projectSlice";

// const LOCALPATH = "https://bugs-management-api.herokuapp.com/v1/api/delete/project/"
const PATH = "https://bugs-management-api.herokuapp.com/v1/api/delete/project/"

export const removeLeader = createAsyncThunk('removeLeader', async (data: { project: projectType, leader: string }) => {
    const response = await fetch(PATH + `${data.project.id}/${data.leader}`, {
        method: 'DELETE'
    })
    return { status: response.ok, projectId: data.project.id, leaderEmail: data.leader };
})