import React from 'react';
import { useLocation } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdShare } from 'react-icons/md';

import MathFieldList from './MathFieldList.tsx';

import './Main.css';

const mainURL = 'https://jun-ikeda.github.io/mathshare?expression=';

const translateExpression = (expression) => {
  // \ -> !BS!, { -> !LPAR2!, } -> !RPAR2!, [ -> !LPAR3!, ] -> !RPAR3!
  // ^ -> !CARET!, < -> !LT!, > -> !GT!, # -> !SHARP!, % -> !PERCENT!, " -> !DQUOTE!
  // | -> !BAR!, ` -> !BQUOTE!, : -> !COLON!, ? -> !QMARK!, / -> !SLASH!, @ -> !AT!
  // $ -> !DOLLAR!, & -> !AMP!, ~ -> !TILDE!, = -> !EQ!, + -> !PLUS!, - -> !MINUS!
  // * -> !STAR!, _ -> !UNDER!, . -> !DOT!, , -> !COMMA!, ; -> !SEMICOLON!s
  //  -> !SPACE!, ' -> !SQUOTE!
  const expression1 = expression.replace(/!BS!/g, '\\');
  const expression2 = expression1.replace(/!RPAR2!/g, '}');
  const expression3 = expression2.replace(/!LPAR2!/g, '{');
  const expression4 = expression3.replace(/!RPAR3!/g, ']');
  const expression5 = expression4.replace(/!LPAR3!/g, '[');
  const expression6 = expression5.replace(/!CARET!/g, '^');
  const expression7 = expression6.replace(/!LT!/g, '<');
  const expression8 = expression7.replace(/!GT!/g, '>');
  const expression9 = expression8.replace(/!SHARP!/g, '#');
  const expression10 = expression9.replace(/!PERCENT!/g, '%');
  const expression11 = expression10.replace(/!DQUOTE!/g, '"');
  const expression12 = expression11.replace(/!BAR!/g, '|');
  const expression13 = expression12.replace(/!BQUOTE!/g, '`');
  const expression14 = expression13.replace(/!COLON!/g, ':');
  const expression15 = expression14.replace(/!QMARK!/g, '?');
  const expression16 = expression15.replace(/!SLASH!/g, '/');
  const expression17 = expression16.replace(/!AT!/g, '@');
  const expression18 = expression17.replace(/!DOLLAR!/g, '$');
  const expression19 = expression18.replace(/!AMP!/g, '&');
  const expression20 = expression19.replace(/!TILDE!/g, '~');
  const expression21 = expression20.replace(/!EQ!/g, '=');
  const expression22 = expression21.replace(/!PLUS!/g, '+');
  const expression23 = expression22.replace(/!MINUS!/g, '-');
  const expression24 = expression23.replace(/!STAR!/g, '*');
  const expression25 = expression24.replace(/!UNDER!/g, '_');
  const expression26 = expression25.replace(/!DOT!/g, '.');
  const expression27 = expression26.replace(/!COMMA!/g, ',');
  const expression28 = expression27.replace(/!SEMICOLON!/g, ';');
  const expression29 = expression28.replace(/!SPACE!/g, ' ');
  const expression30 = expression29.replace(/!SQUOTE!/g, '\'');
  return expression30;
};

const translateExpressionBack = (expression) => {
  const expression1 = expression.replace(/\\/g, '!BS!');
  const expression2 = expression1.replace(/{/g, '!LPAR2!');
  const expression3 = expression2.replace(/}/g, '!RPAR2!');
  const expression4 = expression3.replace(/\[/g, '!LPAR3!');
  const expression5 = expression4.replace(/\]/g, '!RPAR3!');
  const expression6 = expression5.replace(/\^/g, '!CARET!');
  const expression7 = expression6.replace(/</g, '!LT!');
  const expression8 = expression7.replace(/>/g, '!GT!');
  const expression9 = expression8.replace(/#/g, '!SHARP!');
  const expression10 = expression9.replace(/%/g, '!PERCENT!');
  const expression11 = expression10.replace(/"/g, '!DQUOTE!');
  const expression12 = expression11.replace(/\|/g, '!BAR!');
  const expression13 = expression12.replace(/`/g, '!BQUOTE!');
  const expression14 = expression13.replace(/:/g, '!COLON!');
  const expression15 = expression14.replace(/\?/g, '!QMARK!');
  const expression16 = expression15.replace(/\//g, '!SLASH!');
  const expression17 = expression16.replace(/@/g, '!AT!');
  const expression18 = expression17.replace(/\$/g, '!DOLLAR!');
  const expression19 = expression18.replace(/&/g, '!AMP!');
  const expression20 = expression19.replace(/~/g, '!TILDE!');
  const expression21 = expression20.replace(/=/g, '!EQ!');
  const expression22 = expression21.replace(/\+/g, '!PLUS!');
  const expression23 = expression22.replace(/-/g, '!MINUS!');
  const expression24 = expression23.replace(/\*/g, '!STAR!');
  const expression25 = expression24.replace(/_/g, '!UNDER!');
  const expression26 = expression25.replace(/\./g, '!DOT!');
  const expression27 = expression26.replace(/,/g, '!COMMA!');
  const expression28 = expression27.replace(/;/g, '!SEMICOLON!');
  const expression29 = expression28.replace(/ /g, '!SPACE!');
  const expression30 = expression29.replace(/'/g, '!SQUOTE!');
  return expression30;
};

const translateBackLatexList = (latexList) => {
  const lastIndex = latexList.length - [...latexList].reverse().findIndex((item) => item !== '') - 1;
  const nonEmptyLatexList = latexList.slice(0, lastIndex + 1);
  const latex = nonEmptyLatexList.join('\\RETURN');
  const expression = translateExpressionBack(latex);
  return expression;
};

const compareArray = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let index = 0; index < array1.length; index += 1) {
    if (array1[index] !== array2[index]) {
      return false;
    }
  }
  return true;
};

function Main() {
  const [latexList, setLatexList] = React.useState([
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '']);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const expression = translateExpression(query.get('expression') || '');
  React.useEffect(() => {
    const expressionArray = expression.split('\\RETURN');
    const expressionArray100 = expressionArray.length < 100
      ? expressionArray.concat(Array(100 - expressionArray.length).fill(''))
      : expressionArray.slice(0, 100);
    if (!compareArray(latexList, expressionArray100)) {
      setLatexList(expressionArray100);
    }
  }, []);
  return (
    <div className="Main-div">
      <CopyToClipboard text={mainURL + translateBackLatexList(latexList)}>
        <button
          type="button"
          className="Main-sharebutton"
          onClick={() => {
            window.location.replace(mainURL + translateBackLatexList(latexList));
            alert('Link copied to clipboard');
          }}
        >
          <MdShare fontSize={30} color="#d4d4d4" />
        </button>
      </CopyToClipboard>
      <MathFieldList latexList={latexList} setLatexList={setLatexList} />
    </div>
  );
}

export default Main;
