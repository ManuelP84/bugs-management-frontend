import { createAsyncThunk } from "@reduxjs/toolkit";
import { urlApi } from "../../auxTypePlsDeleteMe/urlApi";
import { taskType } from "../../state/slice/taskSlice";

const updateTaskAPI = urlApi + "/v1/api/updateTask";

export const updateTask = createAsyncThunk('updateTask', async (task: taskType) => {
    const response = await fetch(updateTaskAPI, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(task),
    })
    return (await response.json()) as taskType;
})