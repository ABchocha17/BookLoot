import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseProvider } from './context/firebase'; // Import FirebaseProvider instead of firebaseProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <FirebaseProvider> 
        <App />
      </FirebaseProvider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
