import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Grid
} from '@mui/material';

const EmployeeCard = ({ emp, onEdit, onDelete }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: 'flex', alignItems: 'center' }}>
        {emp.photo && (
          <CardMedia
            component="img"
            height="100"
            image={`http://localhost:8000/uploads/${emp.photo}`}
            alt={emp.name}
            sx={{ width: 100, objectFit: 'cover' }}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">{emp.name}</Typography>
          <Typography variant="body2">{emp.designation}</Typography>
          <Typography variant="body2">{emp.email}</Typography>
          <Typography variant="body2">{emp.mobile}</Typography>
          <Typography variant="body2">
            {emp.city}, {emp.state}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => onEdit(emp)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(emp.id)}>Delete</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default EmployeeCard;
