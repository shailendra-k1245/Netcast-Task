import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';

const NotFound = () => <h2 style={{ textAlign: 'center' }}>404 - Page Not Found</h2>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/add"
            element={
              <ProtectedRoute>
                <EmployeeForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/edit/:id"
            element={
              <ProtectedRoute>
                <EmployeeForm />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
