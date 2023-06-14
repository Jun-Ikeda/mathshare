import React from 'react';
import PropTypes from 'prop-types';

import MathField from './MathField.tsx';

import './MathFieldList.css';

// function renderList(latexList, setLatexList) {
//   // let ref = React.createRef();
//   return ;
// }

function MathFieldList({ latexList, setLatexList }) {
  // const [mathFieldList, setMathFieldList] = useState([]);
  let mathFieldList = [];
  return (
    <div className="MathFieldList-div">
      {latexList.map((latex, index) => (
        <MathField
          key={`MathField-${index}`}
          latex={latex}
          setLatex={(newLatex) => setLatexList((prevLatexList) => {
            const newLatexList = [...prevLatexList];
            newLatexList[index] = newLatex;
            return newLatexList;
          })}
          mathquillDidMount={(mathField) => {
            if (mathFieldList.every((element) => mathField.id !== element.id)) {
              const copyMathFieldList = [...mathFieldList];
              copyMathFieldList[index] = mathField;
              for (let i = index + 1; i < copyMathFieldList.length + 1; i += 1) {
                copyMathFieldList[i] = mathFieldList[i - 1];
              }
              mathFieldList = copyMathFieldList;
              // mathFieldList.push(mathField);
              mathField.focus();
            }
          }}
          config={{
            handlers: {
              moveOutOf: (direction) => {
                if (direction === 1) {
                  // console.log(index, latexList.length - 1, index === latexList.length - 1);
                  if (index === latexList.length - 1) {
                    setLatexList((prevLatexList) => [...prevLatexList, '']);
                  } else {
                    mathFieldList[index + 1].focus();
                    mathFieldList[index + 1].moveToLeftEnd();
                  }
                } else if (direction === -1) {
                  if (index === 0) {
                    setLatexList((prevLatexList) => ['', ...prevLatexList]);
                  } else {
                    mathFieldList[index - 1].focus();
                    mathFieldList[index - 1].moveToRightEnd();
                  }
                }
              },

            },
          }}
        />
      ))}
      <button type="button" onClick={() => console.log(mathFieldList)}>Add</button>
    </div>
  );
}

MathFieldList.propTypes = {
  latexList: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLatexList: PropTypes.func.isRequired,
};

export default MathFieldList;
