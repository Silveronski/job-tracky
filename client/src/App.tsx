import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { JobContextProvider } from "./context/JobContext.tsx";
import Layout from "./layout/Layout.tsx";
import LoginRegister from "./pages/Login-Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import EmailVerification from "./pages/EmailVerification.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import EditJob from "./pages/EditJob.tsx";
import './styles/style.scss';

function App() {
  return (
    <AuthContextProvider>
      <JobContextProvider>       
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginRegister/>}></Route>   
            <Route path="/verify-email" element={<EmailVerification/>}></Route>  
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>   
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