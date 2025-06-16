import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';             
import store from './store';                        
import { fetchProducts } from './productsSlice';      
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Carga los productos al arrancar la app
store.dispatch(fetchProducts());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>                           
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
