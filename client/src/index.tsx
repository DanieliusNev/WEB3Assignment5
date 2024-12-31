import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import App from './views/App.tsx';
//import './assetsFolder/mains.css'; // Import the main styles

const root = ReactDOM.createRoot(document.getElementById('root')!);
if (!root) {
    throw new Error('Root element not found! Please ensure you have a div with id="root" in your index.html.');
  }
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
