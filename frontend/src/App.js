import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          
          {/* Public routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;