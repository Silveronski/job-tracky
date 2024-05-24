import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext.jsx';
import LoginRegister from "./pages/Login-Register";
import Dashboard from "./pages/Dashboard";
import './styles/style.scss';
import Layout from "./layout/Layout.jsx";
import EditJob from "./pages/EditJob.jsx";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginRegister/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/edit" element={<EditJob/>}></Route>
            <Route path="*" element={<Navigate to="/login"/>}></Route>
          </Routes>
        </Layout>        
      </BrowserRouter>   
    </AuthContextProvider>  
  )
}

export default App