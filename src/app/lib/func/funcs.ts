interface ICell {
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

function addMine(cells: ICell[][], y: number, x: number) {
    //랜덤 수 추출
    const randomList = MakeRandomList(0, 63, 10);
    console.log(randomList);
    //지뢰 추가
    randomList.forEach((random) => {
        const randomY = Math.floor(random / 8);
        const randomX = random % 8;
        cells[randomY][randomX].value = 9;
        //주변 지뢰 갯수 추가
    });
    //지뢰 갯수 추가
    cells.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell.value > 8) {
                //주변 지뢰 갯수 추가
                for (let i = y - 1; i <= y + 1; i++) {
                    for (let j = x - 1; j <= x + 1; j++) {
                        if (i < 0 || j < 0 || i > 7 || j > 7) {
                            continue;
                        }
                        if (cells[i][j].value < 9) {
                            cells[i][j].value++;
                        }
                    }
                }
            }
        });
    });

    return cells;
}

function makeCells() {
    let y = 8;
    let x = 8;
    let id = 0;
    //셀 생성
    const cells = [...Array(y)].map(() => {
        return [...Array(x)].map(() => {
            return { id: id++, flag: false, visible: false, value: 0 };
        });
    });

    addMine(cells, 0, 0);

    return cells;
}

export { makeCells };
