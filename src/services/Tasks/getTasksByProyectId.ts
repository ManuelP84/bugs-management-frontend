import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectType } from "../../auxTypePlsDeleteMe/urlApi";
import { urlApi } from "../../config/urlApi";
import { taskType } from "../../state/slice/taskSlice";

const getTaskByIdAPI = urlApi + "/getTaskById";

export const getTaskById = createAsyncThunk('getTaskById', async (project: projectType) => {
    const response = await fetch(`${getTaskByIdAPI}/${project.id}`, {
        method: 'GET',
    })
    return (await response.json() as taskType[])
})