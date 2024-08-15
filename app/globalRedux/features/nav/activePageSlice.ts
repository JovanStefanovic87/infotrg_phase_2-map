'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface ActivePageState {
	value: string;
}

const initialState: ActivePageState = {
	value: 'home',
};

const activePageSlice = createSlice({
	name: 'name',
	initialState,
	reducers: {
		toHome: state => {
			state.value = 'home';
		},
		toKalendar: state => {
			state.value = 'kalendar';
		},
	},
});

export const { toHome, toKalendar } = activePageSlice.actions;

export default activePageSlice.reducer;
