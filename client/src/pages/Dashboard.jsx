import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Profile Info
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography><strong>Name:</strong> {user.name}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            <Typography><strong>User ID:</strong> {user.id}</Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Dashboard;
