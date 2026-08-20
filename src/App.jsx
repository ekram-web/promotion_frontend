
import viteLogo from '/vite.svg'
import './App.css'
import AppRouter from './router.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        toastStyle={{
          background: '#041836',
          color: '#ffffff',
          fontWeight: 600,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 208, 156, 0.2)',
          border: '1px solid rgba(0, 208, 156, 0.3)',
        }}
      />
    </>
  )
}

export default App
