import { configureStore } from '@reduxjs/toolkit'
import { calcSlice } from './reducers/calcReducer';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        calc: calcSlice.reducer,
    }
})      