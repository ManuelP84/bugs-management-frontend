import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../../config/stateData";
import { projectType } from "../../state/slice/projectSlice";
import { taskType } from "../../state/slice/taskSlice";

const getTaskByIdAPI = ENDPOINT + "/v1/api/get/tasks";

export const getTasksByProjectId = createAsyncThunk('getTasksByProjectId', async (project: projectType) => {
    const response = await fetch(`${getTaskByIdAPI}/${project.projectId}`, {
        method: 'GET',
    })
    return (await response.json() as taskType[])
})