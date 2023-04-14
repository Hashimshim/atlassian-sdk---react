// eslint-disable-next-line no-use-before-define
import React from 'react';
import * as ReactDOM from 'react-dom';
import IssueTypes from './components/IssueTypes';
import Todo from './components/Todo';

interface IProps {
  contextPath : string
}

export default function App(props : IProps) {
  const { contextPath } = props;
  return (
    <div>
      <IssueTypes contextPath={contextPath} />
      <Todo contextPath={contextPath} />
    </div>
  );
}

window.addEventListener('load', () => {
  const contextPath = (document.getElementById('contextPath') as HTMLInputElement).value;
  const wrapper = document.getElementById('container');
  // eslint-disable-next-line no-unused-expressions
  wrapper ? ReactDOM.render(<App contextPath={contextPath} />, wrapper) : false;
});
