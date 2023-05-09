import React from 'react';
import { makeCells } from './app/lib/func/funcs';

function App() {
    const cells = makeCells();
    console.log(cells);
    return <div></div>;
}

export default App;
