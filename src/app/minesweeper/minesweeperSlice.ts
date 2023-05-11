import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { makeCells, makeEmptyCells } from '../lib/func/funcs';

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
            const { y, x, m }: INewCells = action.payload;
            const stateCopy = { ...state };

            stateCopy.cells = makeCells(y, x, m);
            return stateCopy;
        },
        handleClickUpdateCell: (state, action) => {
            const { id }: { id: number } = action.payload;

            const stateCopy = JSON.parse(JSON.stringify(state));
            // const stateCopy = { state.map((y) =>[ y.map((x) => x)) };
            //깊은 복사 2층
            stateCopy.cells.map((y: any[]) =>
                y.map((x) => {
                    if (x.id === id) {
                        x.visible = true;
                    }
                    return x;
                })
            );

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
export const { newCells, handleClickUpdateCell } = minesweeperSlice.actions;

export default minesweeperSlice.reducer;
