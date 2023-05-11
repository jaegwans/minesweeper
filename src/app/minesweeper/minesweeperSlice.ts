import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { makeCells, makeEmptyCells } from '../lib/func/funcs';

export interface cellsState {
    flag: boolean;
    visible: boolean;
    value: number;
    id: number;
    visited?: boolean;
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
        handelClickZeroCell: (state, action) => {
            const cell = action.payload;
            const { id }: { id: number } = cell;
            const stateCopy = JSON.parse(JSON.stringify(state));
            let zeroCellXY: any = { x: 0, y: 0 };

            console.log(stateCopy.cells);

            // xy 좌표 추출
            stateCopy.cells.map((y: any[]) =>
                y.map((x) => {
                    if (x.id === id) {
                        zeroCellXY.y = stateCopy.cells.indexOf(y);
                        zeroCellXY.x = y.indexOf(x);
                    }
                })
            );
            console.log(zeroCellXY);

            // //find zero cell

            const visited = [];

            const { x, y } = zeroCellXY;
            const { cells } = stateCopy;
            const queue = [{ x: x, y: y }];
            visited.push({ x, y });

            console.log(queue);

            while (queue.length > 0) {
                const { x, y } = queue.shift() as any;
                for (let i = y - 1; i <= y + 1; i++) {
                    for (let j = x - 1; j <= x + 1; j++) {
                        if (i < 0 || j < 0 || i > 7 || j > 7) {
                            continue;
                        }
                        if (cells[i][j].value === 0) {
                            if (!visited.some((v) => v.x === j && v.y === i)) {
                                queue.push({ x: j, y: i });
                                visited.push({ x: j, y: i });
                            }
                        }
                    }
                }
            }
            console.log(visited);
            // //update cells
            visited.map((v) => {
                stateCopy.cells[v.y][v.x].visible = true;
            });
            console.log(stateCopy.cells);

            return stateCopy;
        },
    },
});

// Action creators are generated for each case reducer function
export const { newCells, handleClickUpdateCell, handelClickZeroCell } =
    minesweeperSlice.actions;

export default minesweeperSlice.reducer;
