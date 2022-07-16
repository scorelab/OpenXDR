import React, { } from 'react';

import { Container, Grid, Paper } from '@mui/material';

import './Dashboard.css';
import PageToolbar from '../../components/PageToolbar';
import FlatPaper from '../../components/FlatPaper';
import ComponentStats from './sections/ComponentStats';
import LogStats from './sections/LogStats';
import ActiveComponentList from './sections/ActiveComponentList';

function Dashboard() {

  return (
    <div className="Dashboard">
      <PageToolbar title="Dashboard" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} lg={4}>
            <FlatPaper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 320,
              }}
            >
              <ComponentStats />
            </FlatPaper>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <FlatPaper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 320,
              }}
            >
              <LogStats />
            </FlatPaper>
          </Grid>
          <Grid item xs={12}>
            <FlatPaper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <ActiveComponentList />
            </FlatPaper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
