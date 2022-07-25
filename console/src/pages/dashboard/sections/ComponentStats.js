import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}


function SingleCompnonent({ type, count }) {
  return (<>
    <Typography color="text.secondary" sx={{ flex: 1 }}>
      {type}
    </Typography>
    <Typography component="p" variant="h4">
      {count}
    </Typography>
  </>)
}


function ComponentStats() {
  return (
    <React.Fragment>
      <Typography component="div" variant="h6" color="primary" gutterBottom>
        Components
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <SingleCompnonent type="Log Collectors" count={5} />
        </Grid>
        <Grid item xs={6}>
          <SingleCompnonent type="Processing Units" count={2} />
        </Grid>
        <Grid item xs={6}>
          <SingleCompnonent type="Storage Clusters" count={1} />
        </Grid>
        <Grid item xs={6}>
          <SingleCompnonent type="Indexes" count={4} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ComponentStats;