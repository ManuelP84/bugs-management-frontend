import { createAsyncThunk } from "@reduxjs/toolkit";
import { urlApi } from "../../config/urlApi";
import { taskType } from "../../state/slice/taskSlice";

const deleteTaskAPI = urlApi + "/deleteTask";

export const deleteTask = createAsyncThunk('deleteTask', async (task: taskType) => {
    const response = await fetch(`${deleteTaskAPI}/${task.id}`, {
        method: 'DELETE'
    })
    return {deleted: response.ok, taskId: task.id}
})