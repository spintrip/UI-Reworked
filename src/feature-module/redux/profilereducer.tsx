import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHostProfile } from "./action";

interface ProfileState {
  profile: any; // Adjust this according to the actual profile type
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string; // No null, use empty string for no error state
}

const initialState: ProfileState = {
  profile: null,
  status: "idle",
  error: "", // Initialize as an empty string
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostProfile.pending, (state) => {
        state.status = "loading";
        state.error = ""; // Clear error state when loading starts
      })
      .addCase(
        fetchHostProfile.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.profile = action.payload;
          state.error = ""; // Clear error state on success
        },
      )
      .addCase(fetchHostProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong"; // Set error message
      });
  },
});

export default profileSlice.reducer;
