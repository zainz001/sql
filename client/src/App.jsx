import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'; // Import BrowserRouter, Routes, Route, Navigate, and Outlet
import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from './page/home/home.jsx';
import Login from "./page/login/login.jsx";
import Register from './page/register/register.jsx';

function App() {
  const queryClient = new QueryClient();
  const [darkMode, setDarkMode] = useState(false); // Assuming you have some state to track dark mode

  

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          {/* Include your Navbar, LeftBar, and RightBar components here */}
          <Outlet />
        </div>
      </QueryClientProvider>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
              <Layout />
            
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
