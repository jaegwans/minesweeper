import React, { useState } from 'react';
import { makeCells, ICell } from './app/lib/func/funcs';
import styled from 'styled-components';

function App() {
    const [cells, setcells] = useState<ICell[][]>(makeCells());

    console.log(cells);
    return (
        <StyledMinesweeper>
            <h1>지뢰찾기</h1>
            <div>재시작</div>
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
