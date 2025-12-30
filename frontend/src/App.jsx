import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './components/Auth/indexAuth';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/" element={<Navigate to="/auth" replace />} />
          {/* Add more routes here as you build your application */}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;