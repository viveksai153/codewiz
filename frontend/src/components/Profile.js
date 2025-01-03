import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Container, Typography, Button, Paper, Box, Grid } from '@mui/material';
import AppBar from './AppBar';
import './Profile.css';

// Register Chart.js components
Chart.register(...registerables);

function Profile() {
  const [userData, setUserData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const navigate = useNavigate();

  // Function to fetch user data from the backend with authentication
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No auth token found");
        return;
      }

      const config = {
        headers: { 'auth-token': token }
      };

      const response = await Axios.post('http://localhost:5000/api/auth/getuser', {}, config);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Function to fetch analytics data from the backend
  const fetchAnalyticsData = async (userId) => {
    try {
      const response = await Axios.get(`http://localhost:5000/statistics/${userId}`);
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchAnalyticsData(userData._id);
    }
  }, [userData]);

  // Prepare data for the graph
  const chartData = {
    labels: analyticsData ? analyticsData.weekly.map(data => data.date) : [],
    datasets: [
      {
        label: 'Snippets Created',
        data: analyticsData ? analyticsData.weekly.map(data => data.count) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <>
      <AppBar />
      <Container maxWidth="lg" sx={{ marginTop: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Box textAlign="center">
                {userData ? (
                  <>
                    <Typography variant="h4" gutterBottom>
                      {userData.name}'s Profile
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Email: {userData.email}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLogout}
                      sx={{ marginTop: 2 }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Typography variant="body1">Loading user data...</Typography>
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Box textAlign="center">
                {analyticsData ? (
                  <>
                    <Typography variant="h6">Total Snippets: {analyticsData.totalSnippets}</Typography>
                    <Typography variant="h6">Public Snippets: {analyticsData.publicSnippets}</Typography>
                    <Box my={3}>
                      <Typography variant="h6" gutterBottom>
                        Snippets Created in the Last Week
                      </Typography>
                      <Bar data={chartData} options={chartOptions} />
                    </Box>
                  </>
                ) : (
                  <Typography variant="body1">Loading analytics data...</Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
