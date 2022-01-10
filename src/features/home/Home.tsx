import React from 'react';

const App: React.FC = () => {
  return (
    <div className="p-12">
      <h1 className="font-bold text-xl mb-4">Welcome to a very simple album manager!</h1>
      <p>
        In order to navigate to your album, add
        <span className="mx-1 bg-slate-200 p-1 rounded-md">{'/albums/<Your id>'}</span>
        to the URL
      </p>
    </div>
  );
};

export default App;
