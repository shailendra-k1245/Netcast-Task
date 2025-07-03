import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import axios from '../api/axios';
import EmployeeCard from '../components/EmployeeCard';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/employee/getEmployees');
      setEmployees(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await axios.delete(`/employee/deleteEmployee/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleEdit = (emp) => {
    navigate(`/employees/edit/${emp.id}`, { state: emp });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Employees
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/employees/add')}
          sx={{ mb: 2 }}
        >
          Add New Employee
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {employees.length === 0 ? (
              <Typography>No employees found.</Typography>
            ) : (
              employees.map((emp) => (
                <EmployeeCard
                  key={emp.id}
                  emp={emp}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default EmployeeList;
