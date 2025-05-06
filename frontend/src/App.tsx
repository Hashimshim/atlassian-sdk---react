// src/App.tsx
import React from 'react';
import { render } from 'react-dom';
import Ambassadors from './Ambassadors';
import Logs         from './Logs';
import Main         from './Main';

interface AppProps {
  contextPath: string;
}

const App: React.FC<AppProps> = ({ contextPath }) => {
  const el    = document.getElementById('view') as HTMLInputElement | null;
  const view  =
    (el?.value) ||
    new URLSearchParams(window.location.search).get('view') ||
    'ambassadors';

  // Pass contextPath into each page component:
  return view === 'logs'
    ? <Logs contextPath={contextPath} />
    : view === 'ambassadors'
      ? <Ambassadors contextPath={contextPath} />
      : <Main contextPath={contextPath} />;
};

window.addEventListener('load', () => {
  const cpInput    = document.getElementById('contextPath') as HTMLInputElement | null;
  const contextPath = cpInput?.value || '';
  const container  = document.getElementById('container');
  if (container) {
    render(<App contextPath={contextPath} />, container);
  }
});
