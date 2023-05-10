import React, { useState, useEffect } from 'react';
import { makeCells, ICell } from './app/lib/func/funcs';
import styled from 'styled-components';
// export interface ICell {
//     flag: boolean;
//     visible: boolean;
//     value: number;
//     id: number;
// }
function App() {
    const [cells, setcells] = useState<ICell[][]>(makeCells(8, 8, 10));
    const [makeCellsParams, setMakeCellsParams] = useState([8, 8, 10]);
    useEffect(() => {
        reset();
    }, [makeCellsParams]);

    function reset() {
        setcells(() =>
            makeCells(
                makeCellsParams[0],
                makeCellsParams[1],
                makeCellsParams[2]
            )
        );
    }

    function settingDif(y: number, x: number, mine: number) {
        setMakeCellsParams(() => [y, x, mine]);
    }

    return (
        <StyledMinesweeper>
            <h1>지뢰찾기</h1>
            <div className="setDif">
                <div onClick={() => settingDif(8, 8, 10)}>초급</div>
                <div onClick={() => settingDif(16, 16, 40)}>중급</div>
                <div onClick={() => settingDif(16, 32, 99)}>고급</div>
            </div>
            <div className="reset" onClick={reset}>
                재시작
            </div>
            <StyledTable>
                {cells.map((y) => (
                    <tr>
                        {y.map((x) => (
                            <td>{x.value}</td>
                        ))}
                    </tr>
                ))}
            </StyledTable>
        </StyledMinesweeper>
    );
}

export default App;

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
        border: 1px solid ${({ theme }) => theme.color.black};
        width: 20px;
        height: 20px;
        text-align: center;
        vertical-align: middle;
    }
`;
