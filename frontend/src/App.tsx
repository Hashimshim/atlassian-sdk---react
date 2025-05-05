// src/App.tsx
import React from 'react';
import { render } from 'react-dom';
import Ambassadors from './Ambassadors';
import Logs from './Logs';
import Main from './Main';

interface IProps {
  contextPath: string;
}

const App: React.FC<IProps> = ({ contextPath }) => {
  // read the “view” hidden input or fallback to query‐string
  const el = document.getElementById('view') as HTMLInputElement;
  const view =
    (el && el.value) ||
    new URLSearchParams(window.location.search).get('view') ||
    'ambassadors';

  return view === 'logs' ? (    <Logs contextPath={contextPath} />
  ) :  view === 'ambassadors' ? (
    <Ambassadors />
  ) : (
     <Main contextPath={contextPath} /> );
};

window.addEventListener('load', () => {
  const cpInput = document.getElementById('contextPath') as HTMLInputElement;
  const contextPath = cpInput?.value || '';
  const container = document.getElementById('container');
  if (container) {
    render(<App contextPath={contextPath} />, container);
  }
});
