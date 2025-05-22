import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import store from './utils/appStore.js';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import SessionLoader from './components/AuthProvider.jsx';
import AuthProvider from './components/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Navbar />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<App />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </Provider>
  </>,
)
