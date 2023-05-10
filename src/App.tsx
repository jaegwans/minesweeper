import React, { useState, useEffect, useLayoutEffect } from 'react';
import { makeCells, makeEmptyCells, ICell } from './app/lib/func/funcs';
import styled from 'styled-components';
// export interface ICell {
//     flag: boolean;
//     visible: boolean;
//     value: number;
//     id: number;
// }
function App() {
    const [first, setFirst] = useState(true);
    const [cells, setcells] = useState<ICell[][]>(makeEmptyCells(8, 8));
    const [makeCellsParams, setMakeCellsParams] = useState([8, 8, 10]);
    useEffect(() => {
        firstSet();
    }, [makeCellsParams]);

    let firstCell: ICell | undefined; //처음 눌러진 셀을 저장

    useLayoutEffect(() => {
        if (!first) {
            //첫 클릭 이후 샐 생성
            setcells(() =>
                makeCells(
                    makeCellsParams[0],
                    makeCellsParams[1],
                    makeCellsParams[2]
                )
            );
            if (firstCell?.value === 9) {
                // 첫 클릭이 지뢰일 경우
                setFirst(true); // 첫 클릭으로 돌아감 (useEffect 재호출)
            }
        }
    }, [first]);

    function firstSet() {
        setcells(() => makeEmptyCells(makeCellsParams[0], makeCellsParams[1]));
    }
    // 첫 클릭시 cells 생성
    function clickedSet(cell: ICell) {
        if (first) {
            alert('게임을 시작합니다.');
            setFirst(false);
            firstCell = cell;
        }

        _onClickBlind(cell.id);
    }

    // 난이도 설정
    function settingDif(y: number, x: number, mine: number) {
        setMakeCellsParams(() => [y, x, mine]);
    }

    //visible
    function _onClickBlind(id: number) {
        setcells(
            cells.map((y) =>
                y.map((x) => {
                    if (x.id === id) {
                        return { ...x, visible: true };
                    }
                    return x;
                })
            )
        );
    }

    return (
        <StyledMinesweeper>
            <h1>지뢰찾기</h1>
            <div className="setDif">
                <div onClick={() => settingDif(8, 8, 10)}>초급</div>
                <div onClick={() => settingDif(16, 16, 40)}>중급</div>
                <div onClick={() => settingDif(16, 32, 99)}>고급</div>
            </div>
            <div className="reset" onClick={firstSet}>
                재시작
            </div>

            <StyledTable>
                {cells.map((y) => (
                    <tr>
                        {y.map((x) =>
                            x.visible ? (
                                <StyledCell key={x.id}>{x.value}</StyledCell>
                            ) : (
                                <StyledBlind
                                    key={x.id}
                                    onClick={() => clickedSet(x)}
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
