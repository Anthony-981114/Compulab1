import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar1} from "./components/Navbar";
import { Navbarpage} from "./components/Navbarpage";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Calendarpage } from "./components/Calendar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Laboratoriopage } from "./components/Laboratorio";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
   
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navbar1 />} >
            <Route index element={<Login />} />
          </Route>
          
          <Route path="/calendar" element={<ProtectedRoute><Navbarpage /></ProtectedRoute>} >
          <Route index element={ <ProtectedRoute> <Calendarpage /> </ProtectedRoute> }/>
          </Route>
          <Route path="/laboratorio" element={<ProtectedRoute><Navbarpage /></ProtectedRoute>} >
          <Route index element={ <ProtectedRoute> <Laboratoriopage /> </ProtectedRoute> }/>
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
