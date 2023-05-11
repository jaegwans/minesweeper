import React, { useState, useEffect, useLayoutEffect } from 'react';
import { makeCells, makeEmptyCells, ICell } from './app/lib/func/funcs';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import {
    newCells,
    handleClickUpdateCell,
    handelClickZeroCell,
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

    let mineCount = topState.gameInfo.m; //지뢰 갯수 가져오기

    useEffect(() => {
        let blindCount = topState.gameInfo.x * topState.gameInfo.y; //전체 칸 갯수

        topState.cells.map(
            (
                y: any[] //블라인드 된 셀 수 구하기
            ) => y.map((x) => (x.visible ? --blindCount : null))
        );
        console.log(mineCount, 'mineCount');
        console.log(blindCount, 'blindCount');
        if (blindCount === mineCount) {
            //지뢰 수와 블라인드 셀 수 비교
            alert('승리하셨습니다.');
            dispatch(
                newCells({
                    // 승리시 하던 난이도로 리셋
                    y: topState.gameInfo.y,
                    x: topState.gameInfo.x,
                    m: mineCount,
                })
            );
        }
    }, [topState]);

    function _onClickBlind(cell: ICell) {
        if (cell.value === 0) {
            dispatch(handelClickZeroCell(cell));
            //빈칸일때
        } else if (cell.value === 9) {
            //지뢰일때
            alert('지뢰를 밟았습니다.');
            dispatch(
                newCells({
                    y: topState.gameInfo.y,
                    x: topState.gameInfo.x,
                    m: mineCount,
                })
            ); //지뢰 밟으면  리셋
        } else {
            //숫자일때
            dispatch(handleClickUpdateCell(cell));
        }
    }

    function firstSet() {
        dispatch(
            newCells({
                //재시작시 하던 난이도로 리셋
                y: topState.gameInfo.y,
                x: topState.gameInfo.x,
                m: mineCount,
            })
        );
        console.log(topState, 'topCells');
    }

    return (
        <StyledMinesweeper>
            <h1>지뢰찾기</h1>

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
