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
    gameInfo: { y: 8, x: 8, m: 10 },
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
            //새로운 셀 생성
            const { y, x, m }: INewCells = action.payload;
            const stateCopy = { ...state }; // 복사 1층

            stateCopy.cells = makeCells(y, x, m); // 새로운 셀 생성
            stateCopy.gameInfo = { y: y, x: x, m: m }; // 새로운 게임 정보
            return stateCopy;
        },
        handleClickUpdateCell: (state, action) => {
            // 클릭시 셀 업데이트 (숫자만)
            const { id }: { id: number } = action.payload;

            const stateCopy = JSON.parse(JSON.stringify(state)); //깊은 복사 2층 / 느린 방법이었고 더 좋은 방법이 있다고 생각함

            stateCopy.cells.map((y: any[]) =>
                y.map((x) => {
                    if (x.id === id) {
                        x.visible = true; // 클릭한 셀 visible true
                    }
                    return x;
                })
            );

            return stateCopy;
        },
        handleRightClickUpdateCell: (state, action) => {
            // 오른쪽 클릭시 셀 업데이트 (깃발)
            const { id }: { id: number } = action.payload;
            const stateCopy = JSON.parse(JSON.stringify(state)); //깊은 복사 2층
            let zeroCellXY: any = { x: 0, y: 0 }; // 클릭한 셀의 좌표 를 담을 변수

            // xy 좌표 추출
            stateCopy.cells.map((y: any[]) =>
                y.map((x) => {
                    if (x.id === id) {
                        zeroCellXY.y = stateCopy.cells.indexOf(y);
                        zeroCellXY.x = y.indexOf(x);
                    }
                })
            );
            stateCopy.cells[zeroCellXY.y][zeroCellXY.x].flag =
                !stateCopy.cells[zeroCellXY.y][zeroCellXY.x].flag; // 클릭한 셀의 깃발 상태 변경
            return stateCopy;
        },
        handelClickZeroCell: (state, action) => {
            // 클릭한 셀이 0일 경우 셀 포함 주변 셀 업데이트
            const cell = action.payload; // 클릭한 셀
            const { id }: { id: number } = cell; // 클릭한 셀 id
            const stateCopy = JSON.parse(JSON.stringify(state)); //깊은 복사 2층
            let zeroCellXY: any = { x: 0, y: 0 }; // 클릭한 셀의 좌표 를 담을 변수

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

            const visited = []; // 방문한 셀을 담을 배열

            const { x, y } = zeroCellXY; // 클릭한 셀의 좌표
            const { cells } = stateCopy; // 셀들
            const queue = [{ x: x, y: y }]; // 방문할 셀을 담을 큐
            visited.push({ x, y }); // 방문한 셀을 담음

            while (queue.length > 0) {
                // 큐가 빌때까지 반복
                const { x, y } = queue.shift() as any; // 큐에서 셀을 꺼냄
                for (let i = y - 1; i <= y + 1; i++) {
                    for (let j = x - 1; j <= x + 1; j++) {
                        if (
                            //범위를 벗어날 경우 continue
                            i < 0 ||
                            j < 0 ||
                            i > state.gameInfo.y - 1 ||
                            j > state.gameInfo.x - 1
                        ) {
                            continue;
                        }

                        if (cells[i][j].value < 9) {
                            visited.push({ x: j, y: i }); // 방문한 셀에 넣음
                        }

                        if (cells[i][j].value === 0) {
                            // 빈칸이면

                            if (!visited.some((v) => v.x === j && v.y === i)) {
                                // 현 방문 셀이 아니면

                                queue.push({ x: j, y: i }); //큐에 넣고
                                visited.push({ x: j, y: i }); // 방문한 셀에 넣음
                            }
                        }
                    }
                }
            }
            console.log(visited);

            visited.map((v) => {
                stateCopy.cells[v.y][v.x].visible = true;
            });
            console.log(stateCopy.cells);

            return stateCopy;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    newCells,
    handleClickUpdateCell,
    handelClickZeroCell,
    handleRightClickUpdateCell,
} = minesweeperSlice.actions;

export default minesweeperSlice.reducer;
