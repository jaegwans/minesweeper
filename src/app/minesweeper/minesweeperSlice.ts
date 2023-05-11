import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { makeCells } from '../lib/func/funcs';

export interface cellsState {
    flag: boolean;
    visible: boolean;
    value: number;
    id: number;
}
//newCells,handleClickUpdateCell(클릭시),gameState
const initialState: any = {
    cells: makeCells(8, 8, 10),
    gameState: 0,
};

interface INewCells {
    x: number;
    y: number;
    m: number;
}

export const minesweeperSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        newCells: (state, action) => {
            const { x, y, m }: INewCells = action.payload;
            const stateCopy = { ...state, cells: makeCells(x, y, m) };

            return stateCopy;
        },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
});

// Action creators are generated for each case reducer function
export const { newCells } = minesweeperSlice.actions;

export default minesweeperSlice.reducer;
