import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  Alert
} from '@mui/material';
import axios from '../api/axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';

const EmployeeForm = () => {
  const { id } = useParams(); // For edit mode
  const location = useLocation(); // For passing employee data in edit
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    city: '',
    state: '',
    photo: null
  });

  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill form in edit mode
  useEffect(() => {
    if (isEdit && location.state) {
      const emp = location.state;
      setFormData({
        name: emp.name,
        email: emp.email,
        mobile: emp.mobile,
        designation: emp.designation,
        city: emp.city,
        state: emp.state,
        photo: null // Don't load existing photo into file input
      });
      setPreviewUrl(`http://localhost:8000/uploads/${emp.photo}`);
    }
  }, [isEdit, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      if (isEdit) {
        await axios.put(`/employee/updateEmployee/${id}`, data);
        alert('Employee updated');
      } else {
        await axios.post('/employee/addEmployee', data);
        alert('Employee added');
      }
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            {isEdit ? 'Edit Employee' : 'Add Employee'}
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" sx={{ mt: 2 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              fullWidth
              required
              value={formData.mobile}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Designation"
              name="designation"
              fullWidth
              required
              value={formData.designation}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="City"
              name="city"
              fullWidth
              required
              value={formData.city}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="State"
              name="state"
              fullWidth
              required
              value={formData.state}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <Button variant="outlined" component="label" sx={{ mt: 1 }}>
              Upload Photo
              <input type="file" name="photo" hidden onChange={handleFileChange} />
            </Button>

            {previewUrl && (
              <Box sx={{ mt: 2 }}>
                <img src={previewUrl} alt="Preview" height="100" />
              </Box>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? 'Submitting...' : isEdit ? 'Update' : 'Add'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default EmployeeForm;
