// src/Logs.tsx
import React from 'react';


interface MainProps {
  contextPath: string;
}

const Main: React.FC<MainProps> = ({ contextPath }) => {
  return (
    <div>
      <h1>Main user page</h1>
    </div>
  );
};

export default Main;
