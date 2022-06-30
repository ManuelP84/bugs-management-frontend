import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../../config/stateData";
import { taskType } from "../../state/slice/taskSlice";

const updateTaskAPI = ENDPOINT + "/v1/api/update/task";

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