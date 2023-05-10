export interface ICell {
    flag: boolean;
    visible: boolean;
    value: number;
    id: number;
}

function MakeRandomList(min: number, max: number, count: number) {
    //랜덤 수 추출
    const randomList = [];
    while (randomList.length < count) {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        if (randomList.indexOf(random) === -1) {
            randomList.push(random);
        }
    }
    return randomList;
}

function addMine(cells: ICell[][], y: number, x: number, mine: number) {
    //랜덤 수 추출
    const randomList = MakeRandomList(0, y * x - 1, mine);
    //지뢰 추가
    const cellsCopy = cells.map((row) => {
        return row.map((cell) => {
            return {
                ...cell,
                value: randomList.includes(cell.id) ? 9 : 0,
            };
        });
    });

    // 지뢰 갯수 추가

    cellsCopy.forEach((row, yy) => {
        row.forEach((cell, xx) => {
            if (cell.value > 8) {
                //지뢰라면
                //주변 지뢰 갯수 추가
                for (let i = yy - 1; i <= yy + 1; i++) {
                    for (let j = xx - 1; j <= xx + 1; j++) {
                        if (i < 0 || j < 0 || i > y - 1 || j > x - 1) {
                            continue;
                        }

                        if (cellsCopy[i][j].value < 9) {
                            cellsCopy[i][j].value++;
                        }
                    }
                }
            }
        });
    });

    return cellsCopy;
}

function makeCells(y: number, x: number, mine: number) {
    let id = 0;
    //셀 생성
    let cells = [...Array(y)].map(() => {
        return [...Array(x)].map(() => {
            return { id: id++, flag: false, visible: false, value: 0 };
        });
    });

    cells = addMine(cells, y, x, mine);
    console.log(cells);
    return cells;
}
function makeEmptyCells(y: number, x: number) {
    let id = 0;
    //셀 생성
    let cells = [...Array(y)].map(() => {
        return [...Array(x)].map(() => {
            return { id: id++, flag: false, visible: false, value: 0 };
        });
    });

    return cells;
}

export { makeCells, makeEmptyCells };
