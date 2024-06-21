import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { JobContextProvider } from "./context/JobContext.tsx";
import Layout from "./layout/Layout.tsx";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import EmailVerification from "./pages/EmailVerification.tsx";
import PasswordRecovery from "./pages/PasswordRecovery.tsx";
import EditJob from "./pages/EditJob.tsx";
import Account from "./pages/Account.tsx";
import './styles/style.scss';

function App() {
  return (
    <AuthContextProvider>
      <JobContextProvider>       
        <Layout>
          <Routes>
            <Route path="/login" element={<Auth/>}></Route>   
            <Route path="/verify-email" element={<EmailVerification/>}></Route>  
            <Route path="/forgot-password" element={<PasswordRecovery/>}></Route>   
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/edit" element={<EditJob/>}></Route>     
            <Route path="/account" element={<Account/>}></Route>     
            <Route path="*" element={<Navigate to="/login"/>}></Route>
          </Routes>
        </Layout>                 
      </JobContextProvider>  
    </AuthContextProvider>  
  )
}

export default App