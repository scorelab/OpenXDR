import React, { useEffect, useState } from 'react';

import { Container, Grid, Paper } from '@mui/material';

import './Dashboard.css';
import PageToolbar from '../../components/PageToolbar';
import FlatPaper from '../../components/FlatPaper';
import ComponentStats from './sections/ComponentStats';
import LogStats from './sections/LogStats';
import ActiveComponentList from './sections/ActiveComponentList';

import * as ConsoleApi from '../../services';

function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    var api = new ConsoleApi.DefaultApi()
    var callback = function (error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully. Returned data: ' + data);
        setLogs(data)
      }
    };
    api.getAll(callback);
  }, [])


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
              <ComponentStats data={{'logs': logs.length, 'pu': 'N/A', 'sc': 'N/A', 'indexes': 'N/A'}}/>
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
              <ActiveComponentList logs={logs.filter(l => l.status === 'active')}/>
            </FlatPaper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
