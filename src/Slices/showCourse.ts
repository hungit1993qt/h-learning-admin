import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ListCourse } from "../Interface/ListCourse";
import courseAPI from "../Services/courseAPI";

interface State {
  listCourse: ListCourse[];
  isLoading: boolean;
  error: string | null;
  actionMenu: boolean;
}

const initialState: State = {
  listCourse: [],
  isLoading: false,
  error: null,
  actionMenu: false,
};

// thunk actions
export const getListCourse = createAsyncThunk(
  "course/getListCourse",
  async (tenKhoaHoc:string) => {
    try {
      const respone = await courseAPI.getListCourse(tenKhoaHoc);
      const data = respone.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    ActionMenu: (state, { payload }) => {
      state.actionMenu = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListCourse.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.listCourse = payload;
    });
    builder.addCase(getListCourse.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error as any;
    });
  },
});

// export actions 
export const  { ActionMenu } = courseSlice.actions;
// export reducer
export default courseSlice.reducer;
