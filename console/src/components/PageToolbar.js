import React, { } from 'react';

import { Divider, Paper, Toolbar, Typography } from '@mui/material';

function PageToolbar({ title }) {

  return (
    <Paper elevation={0} sx={{ flexGrow: 1, background: 'white', borderRadius: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
      <Divider />
    </Paper>
  );
}

export default PageToolbar;
