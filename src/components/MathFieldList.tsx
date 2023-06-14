import React from 'react';
import PropTypes from 'prop-types';

import MathField from './MathField.tsx';

import './MathFieldList.css';

const moveDown = (mathFieldList, index) => {
  if (index !== mathFieldList.length - 1) {
    mathFieldList[index + 1].focus();
    mathFieldList[index + 1].moveToLeftEnd();
  }
};

const moveUp = (mathFieldList, index) => {
  if (index !== 0) {
    mathFieldList[index - 1].focus();
    mathFieldList[index - 1].moveToRightEnd();
  }
};

function MathFieldList({ latexList, setLatexList }) {
  const mathFieldList = [];
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
              mathFieldList.push(mathField);
            }
          }}
          config={{
            handlers: {
              moveOutOf: (direction) => ((direction === 1)
                ? moveDown(mathFieldList, index)
                : moveUp(mathFieldList, index)),
              downOutOf: () => moveDown(mathFieldList, index),
              upOutOf: () => moveUp(mathFieldList, index),
              enter: () => moveDown(mathFieldList, index),
            },
          }}
        />
      ))}
    </div>
  );
}

MathFieldList.propTypes = {
  latexList: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLatexList: PropTypes.func.isRequired,
};

export default MathFieldList;
