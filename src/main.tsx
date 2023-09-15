// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProvider } from "./contexts/productsContext.tsx";
import { Toaster } from './components/ui/toaster.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Router>
    <ProductProvider>
      <App />
      <Toaster />
    </ProductProvider>
  </Router>
  // </React.StrictMode>,
)
