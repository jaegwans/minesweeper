import React, { useState, useEffect, useLayoutEffect } from 'react';
import { makeCells, makeEmptyCells, ICell } from './app/lib/func/funcs';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import {
    newCells,
    handleClickUpdateCell,
} from './app/minesweeper/minesweeperSlice';
// export interface ICell {
//     flag: boolean;
//     visible: boolean;
//     value: number;
//     id: number;
// }
function App() {
    const dispatch = useDispatch();
    const topState = useSelector((state: RootState) => state);
    console.log(topState, 'topCellsfirst');

    // const [cells, setcells] = useState<ICell[][]>(makeCells(8, 8, 10));

    // let firstCell: ICell | undefined; //처음 눌러진 셀을 저장

    function _onClickBlind(id: number) {
        dispatch(handleClickUpdateCell(id));
        // setcells(
        //     cells.map((y) =>
        //         y.map((x) => {
        //             if (x.id === id) {
        //                 return { ...x, visible: true };
        //             }
        //             return x;
        //         })
        //     )
        // );
    }

    function firstSet() {
        dispatch(newCells({ y: 8, x: 8, m: 10 }));
        console.log(topState, 'topCells');
    }
    // 첫 클릭시 cells 생성
    // function clickedSet(cell: ICell) {
    //     firstCell = cell;
    //     if (first) {
    //         alert('게임을 시작합니다.');
    //         setFirst(false);
    //         setFirstSetValue(cell);
    //     }
    // }

    // 난이도 설정
    // function settingDif(y: number, x: number, mine: number) {
    //     setMakeCellsParams(() => [y, x, mine]);
    // }

    //visible

    return (
        <StyledMinesweeper>
            <h1>지뢰찾기</h1>
            {/* {JSON.stringify(topState.cells)} */}

            <div className="setDif">
                <div onClick={() => dispatch(newCells({ y: 8, x: 8, m: 10 }))}>
                    초급
                </div>
                <div
                    onClick={() => dispatch(newCells({ y: 16, x: 16, m: 40 }))}
                >
                    중급
                </div>
                <div
                    onClick={() => dispatch(newCells({ y: 16, x: 32, m: 99 }))}
                >
                    고급
                </div>
            </div>
            <div className="reset" onClick={firstSet}>
                재시작
            </div>

            <StyledTable>
                {topState.cells.map((y: any[]) => (
                    <tr>
                        {y.map((x) =>
                            x.visible ? (
                                <StyledCell key={x.id}>{x.value}</StyledCell>
                            ) : (
                                <StyledBlind
                                    key={x.id}
                                    onClick={() => _onClickBlind(x)}
                                >
                                    {x.value}
                                </StyledBlind>
                            )
                        )}
                    </tr>
                ))}
            </StyledTable>
        </StyledMinesweeper>
    );
}

export default App;

const StyledCell = styled.td`
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        transform: scale(1.2);
    }
`;

const StyledBlind = styled.td`
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        transform: scale(1.2);
        background-color: ${({ theme }) => theme.color.deepgray};
    }
    border: 1px solid ${({ theme }) => theme.color.black};
    background-color: ${({ theme }) => theme.color.gray};
`;

const StyledMinesweeper = styled.div`
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    flex-direction: column;
    .reset {
        cursor: pointer;
    }
    .setDif {
        div {
            cursor: pointer;
        }
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
`;

const StyledTable = styled.table`
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid ${({ theme }) => theme.color.black};
    margin: 0 auto;
    td {
        width: 20px;
        height: 20px;
        text-align: center;
        vertical-align: middle;
    }
`;
