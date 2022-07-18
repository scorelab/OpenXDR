import { Paper } from '@mui/material';
import React, { } from 'react';


export default function FlatPaper({ children, ...props }) {
  return (
    <Paper elevation={0} variant="outlined" {...props} >
      {children}
    </Paper>
  );
}