import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import API from "../../utils/axios";



// GET TASKS
export const getBoardTasks =
  createAsyncThunk(
    "tasks/getBoardTasks",

    async (boardId, thunkAPI) => {

      try {

        const token =
          thunkAPI.getState().user.userToken;

        const config = {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        };



        const response = await API.get(
          `/tasks/board/${boardId}`,
          config
        );

        return response.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );



const taskSlice = createSlice({
  name: "tasks",

  initialState: {
    tasks: [],
    loading: false,
  },

  reducers: {

    addTaskRealtime: (
      state,
      action
    ) => {

      state.tasks.push(
        action.payload
      );
    },



    moveTaskRealtime: (
      state,
      action
    ) => {

      const index =
        state.tasks.findIndex(
          (task) =>
            task._id ===
            action.payload._id
        );

      if (index !== -1) {

        state.tasks[index] =
          action.payload;
      }
    },
  },



  extraReducers: (builder) => {

    builder

      .addCase(
        getBoardTasks.pending,
        (state) => {

          state.loading = true;
        }
      )

      .addCase(
        getBoardTasks.fulfilled,
        (state, action) => {

          state.loading = false;

          state.tasks =
            action.payload;
        }
      )

      .addCase(
        getBoardTasks.rejected,
        (state) => {

          state.loading = false;
        }
      );
  },
});



export const {
  addTaskRealtime,
  moveTaskRealtime,
} = taskSlice.actions;

export default taskSlice.reducer;