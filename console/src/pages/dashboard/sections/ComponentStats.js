import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


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


function ComponentStats({data}) {
  return (
    <React.Fragment>
      <Typography component="div" variant="h6" color="primary" gutterBottom>
        Components
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <SingleCompnonent type="Log Collectors" count={data.logs} />
        </Grid>
        <Grid item xs={6}>
          <SingleCompnonent type="Processing Units" count={data.pu} />
        </Grid>
        <Grid item xs={6}>
          <SingleCompnonent type="Storage Clusters" count={data.sc} />
        </Grid>
        <Grid item xs={6}>
          <SingleCompnonent type="Indexes" count={data.indexes} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ComponentStats;