import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './components/Auth/indexAuth';
import DoctorLayout from './components/Doctor/DoctorLayout';
import DoctorDashboard from './pages/doctor/Dashboard';
import NewPatientRecord from './pages/doctor/NewPatientRecord';
import DoctorProfile from './pages/doctor/DoctorProfile';
import Patients from './pages/doctor/Patients';
import PatientLayout from './components/Patient/PatientLayout';
import PatientHome from './pages/patient/Home';
import Profile from './pages/patient/Profile';
import Appointments from './pages/patient/Appointments';
import Visits from './pages/patient/Visits';
import Results from './pages/patient/Results';
import Prescriptions from './pages/patient/Prescriptions';
import Payments from './pages/patient/Payments';
import Notifications from './pages/patient/Notifications';
import Telemedicine from './pages/patient/Telemedicine';
import Reviews from './pages/patient/Reviews';
import Articles from './pages/patient/Articles';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/" element={<Navigate to="/auth" replace />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route index element={<Navigate to="/doctor/dashboard" replace />} />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/new" element={<NewPatientRecord />} />
            <Route path="profile" element={<DoctorProfile />} />
            {/* Thêm các route khác cho bác sĩ ở đây */}
          </Route>

          {/* Patient Routes */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route index element={<Navigate to="/patient/home" replace />} />
            <Route path="home" element={<PatientHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="visits" element={<Visits />} />
            <Route path="results" element={<Results />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="payments" element={<Payments />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="telemedicine" element={<Telemedicine />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="articles" element={<Articles />} />
          </Route>
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