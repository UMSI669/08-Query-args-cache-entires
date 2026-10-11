import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedEventId: null,
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    eventSelected(state, action) {
      state.selectedEventId = action.payload;
    },
    selectionCleared(state) {
      state.selectedEventId = null;
    },
  },
});

export const { eventSelected, selectionCleared } = selectionSlice.actions;
export const selectSelectedEventId = (state) => state.selection.selectedEventId;
export default selectionSlice.reducer;
