import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./pages/Login-Register";
import Dashboard from "./pages/Dashboard";
import './styles/style.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRegister/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="*" element={<Navigate to="/login"/>}></Route>
      </Routes>
    </BrowserRouter>   
  )
}

export default App