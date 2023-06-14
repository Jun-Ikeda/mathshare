import React from 'react';
import MathFieldList from './components/MathFieldList.tsx';

import './App.css';

function App() {
  const [latexList, setLatexList] = React.useState(['\\sum_{n=1}^{\\infty}\\frac{1}{n^2}', '\\sum_{n=1}^{\\infty}\\frac{1}{n^3}', '\\sum_{n=1}^{\\infty}\\frac{1}{n^4}']);
  return (
    <div className="App">
      <header className="App-header">
        <MathFieldList latexList={latexList} setLatexList={setLatexList} />
        <button type="button" onClick={() => console.log(latexList)}>Print latexList</button>
      </header>
    </div>
  );
}

export default App;
