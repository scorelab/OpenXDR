import React, { useState } from 'react';

import './ComponentDetails.css';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

function ComponentDetails() {
  const { os, setOs } = useState(0);

  const handleChange = (event) => {
    setOs(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { mb: 2 } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          fullWidth
          id="name"
          label="Component Name"
          placeholder="Linux Log"
          variant="standard"
        />
        <div>
          <FormControl required variant="standard" sx={{ mb: 2, minWidth: 240 }}>
            <InputLabel id="demo-simple-select-label">Operating System</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={os}
              label="Operating System"
              onChange={handleChange}
            >
              <MenuItem value={0}>Linux</MenuItem>
              <MenuItem value={1}>Windows</MenuItem>
              <MenuItem value={2}>MacOS</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TextField
          required
          fullWidth
          id="source"
          label="Source"
          placeholder="/var/log/syslog"
          variant="standard"
        />
        <Box sx={{float: 'right'}}>
          <Button sx={{ ml: 1, mt: 4 }} variant="contained" disableElevation>
            ADD
          </Button>
        </Box>
      </div>
    </Box>
  );
}

export default ComponentDetails;
