import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, Box, Button, CardActions, CircularProgress } from '@mui/material';
import { fetchRehearsals } from '../redux/slices/rehearsalSlice';
import { fetchBands } from '../redux/slices/bandSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rehearsals, loading: rehearsalsLoading } = useSelector((state) => state.rehearsals);
  const { bands, loading: bandsLoading } = useSelector((state) => state.bands);

  useEffect(() => {
    dispatch(fetchRehearsals());
    dispatch(fetchBands());
  }, [dispatch]);

  const upcomingRehearsals = rehearsals
    .filter((rehearsal) => new Date(rehearsal.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 3);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const loading = rehearsalsLoading || bandsLoading;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Your Bands
                </Typography>
                {bands.length === 0 ? (
                  <Typography variant="body1" color="text.secondary">
                    You're not a member of any bands yet.
                  </Typography>
                ) : (
                  bands.map((band) => (
                    <Box key={band.id} sx={{ mb: 2 }}>
                      <Typography variant="h6">{band.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {band.description || 'No description'}
                      </Typography>
                    </Box>
                  ))
                )}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate('/bands')}>
                  View All Bands
                </Button>
                <Button size="small" color="primary" onClick={() => navigate('/bands', { state: { openCreateDialog: true } })}>
                  Create New Band
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Upcoming Rehearsals
                </Typography>
                {upcomingRehearsals.length === 0 ? (
                  <Typography variant="body1" color="text.secondary">
                    No upcoming rehearsals scheduled.
                  </Typography>
                ) : (
                  upcomingRehearsals.map((rehearsal) => (
                    <Box key={rehearsal.id} sx={{ mb: 2 }}>
                      <Typography variant="h6">{rehearsal.title}</Typography>
                      <Typography variant="body2">
                        Band: {rehearsal.bandName}
                      </Typography>
                      <Typography variant="body2">
                        When: {formatDate(rehearsal.startTime)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Location: {rehearsal.location || 'TBD'}
                      </Typography>
                    </Box>
                  ))
                )}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate('/rehearsals')}>
                  View All Rehearsals
                </Button>
                <Button size="small" color="primary" onClick={() => navigate('/rehearsals', { state: { openCreateDialog: true } })}>
                  Schedule Rehearsal
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;