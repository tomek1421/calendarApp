import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import { Home } from './pages/Home';
import { Error } from './pages/Error';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { SharedLayout } from './components/SharedLayout';
import { AuthProvider } from './components/Context';
import { Day } from './pages/Day';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />} >
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/calendar-day/:dayId/:dayOfWeekId/:monthId" element={<Day />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
