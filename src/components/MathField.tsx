import React from 'react';
import PropTypes from 'prop-types';
import { addStyles, EditableMathField } from 'react-mathquill';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';

import './MathField.css';

const autoCommands = 'alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi pi rho sigma tau upsilon phi chi omega varepsilon varpi vartheta varkappa varrho varphi Gamma Delta Theta Lambda Xi Pi Sigma Upsilon Phi Psi Omega rightarrow leftarrow Rightarrow Leftarrow leftrightarrow Leftrightarrow forall notin ni subset supset cup cap emptyset infty aleph Re Im partial nabla int sum prod sqrt binom';
// psi, in, exists, setminus,
const autoOperatorNames = 'sin cos tan cot ln log exp abs arcsin arccos arctan';

addStyles();

function MathField({
  latex, setLatex, config = {}, mathquillDidMount,
}) {
  const defaultConfig = {
    // spaceBehavesLikeTab: true,
    supSubsRequireOperand: true,
    sumStartsWithNEquals: true,
    autoCommands,
    autoOperatorNames,
  };
  const mergedConfig = { ...defaultConfig, ...config };

  return (
    <div className="MathField-div">
      <CopyToClipboard text={latex}>
        <button type="button" className="MathField-copyButton">
          <MdContentCopy fontSize={20} color="#d4d4d4" />
        </button>
      </CopyToClipboard>
      <EditableMathField
        className="MathField-EditableMathField"
        latex={latex}
        onChange={(mathField) => {
          if (mathField !== undefined) {
            setLatex(mathField.latex());
          }
        }}
        config={mergedConfig}
        mathquillDidMount={mathquillDidMount}
      />
    </div>
  );
}

const configPropType = PropTypes.shape({
  spaceBehavesLikeTab: PropTypes.bool,
  leftRightIntoCmdGoes: PropTypes.oneOf(['up', 'down']),
  restrictMismatchedBrackets: PropTypes.bool,
  sumStartsWithNEquals: PropTypes.bool,
  supSubsRequireOperand: PropTypes.bool,
  charsThatBreakOutOfSupSub: PropTypes.string,
  autoSubscriptNumerals: PropTypes.bool,
  autoCommands: PropTypes.string,
  autoOperatorNames: PropTypes.string,
  substituteTextarea: PropTypes.func,
  handlers: PropTypes.shape({
    deleteOutOf: PropTypes.func,
    moveOutOf: PropTypes.func,
    selectOutOf: PropTypes.func,
    downOutOf: PropTypes.func,
    upOutOf: PropTypes.func,
    edit: PropTypes.func,
    enter: PropTypes.func,
  }),
  maxDepth: PropTypes.number,
});

MathField.propTypes = {
  config: configPropType,
  latex: PropTypes.string.isRequired,
  setLatex: PropTypes.func.isRequired,
  mathquillDidMount: PropTypes.func.isRequired,
};

export default MathField;
