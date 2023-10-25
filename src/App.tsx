import React, { useState, useEffect, useLayoutEffect } from 'react';
import { makeCells, makeEmptyCells, ICell } from './app/lib/func/funcs';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import {
    newCells,
    handleClickUpdateCell,
    handelClickZeroCell,
    handleRightClickUpdateCell,
} from './app/minesweeper/minesweeperSlice';
import './App.scss';
// export interface ICell {
//     flag: boolean;
//     visible: boolean;
//     value: number;
//     id: number;
// }
function App() {
    const dispatch = useDispatch();
    const topState = useSelector((state: RootState) => state);
    const [firstClick, setFirstClick] = useState(true); //첫 클릭인지 확인

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
    function _onRightClickCell(e: any, cell: ICell) {
        e.preventDefault();
        dispatch(handleRightClickUpdateCell(cell));
    }

    return (
        <div className="minesweeper">
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

            <table className="mine-table">
                {topState.cells.map((y: any[]) => (
                    <tr>
                        {y.map((x) =>
                            x.visible ? (
                                <td className="cell" key={x.id}>
                                    {x.value}
                                </td>
                            ) : (
                                <td
                                    className="blind"
                                    key={x.id}
                                    onClick={() => _onClickBlind(x)}
                                    onContextMenu={(e) =>
                                        _onRightClickCell(e, x)
                                    }
                                >
                                    {x.flag ? '🚩' : null}
                                </td>
                            )
                        )}
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default App;
