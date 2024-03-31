import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import { BrowserRouter } from 'react-router-dom' 
// 非 null アサーション演算子 (!) を使用して、エレメントが null でないことを確認
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
