import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../../config/stateData";
import { taskType } from "../../state/slice/taskSlice";

const deleteTaskAPI = ENDPOINT + "/v1/api/delete/task";

export const deleteTask = createAsyncThunk('deleteTask', async (task: taskType) => {
    const response = await fetch(`${deleteTaskAPI}/${task.id}`, {
        method: 'DELETE'
    })
    return {deleted: response.ok, taskId: task.id}
})