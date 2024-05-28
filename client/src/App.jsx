import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext.jsx';
import { JobContextProvider } from "./context/JobContext.jsx";
import LoginRegister from "./pages/Login-Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout/Layout.jsx";
import EditJob from "./pages/EditJob.jsx";
import './styles/style.scss';

function App() {
  return (
    <AuthContextProvider>
      <JobContextProvider>       
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginRegister/>}></Route>        
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/edit" element={<EditJob/>}></Route>         
            <Route path="*" element={<Navigate to="/login"/>}></Route>
          </Routes>
        </Layout>                 
      </JobContextProvider>  
    </AuthContextProvider>  
  )
}

export default App