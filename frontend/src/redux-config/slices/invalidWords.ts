import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const invalidWordsSlice = createSlice({
  name: "invalid-words",
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<string>) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    reset: () => initialState,
  },
});
