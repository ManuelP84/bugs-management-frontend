import { createAsyncThunk } from "@reduxjs/toolkit";
import { urlApi } from "../../auxTypePlsDeleteMe/urlApi";
import { taskType } from "../../state/slice/taskSlice";

const createProductsAPI = urlApi + "/v1/api/createProduct";

export const createNewTask = createAsyncThunk('createNewTask', async (task: taskType) => {
    const response = await fetch(createProductsAPI, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(task),
    })
    return (await response.json()) as taskType;
})