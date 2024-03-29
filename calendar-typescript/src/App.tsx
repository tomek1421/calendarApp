import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import { Home } from './components/Home';
import { Error } from './components/Error';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { SharedLayout } from './components/SharedLayout';
import { AuthProvider } from './components/Context';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />} >
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
