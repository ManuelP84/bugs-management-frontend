import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectType } from "../../auxTypePlsDeleteMe/projectType";
import { urlApi } from "../../auxTypePlsDeleteMe/urlApi";
import { taskType } from "../../state/slice/taskSlice";

const getTaskByIdAPI = urlApi + "/v1/api/getTaskById";

export const getTasksByProjectId = createAsyncThunk('getTasksByProjectId', async (project: projectType) => {
    const response = await fetch(`${getTaskByIdAPI}/${project.id}`, {
        method: 'GET',
    })
    return (await response.json() as taskType[])
})