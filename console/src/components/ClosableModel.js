import React, { } from 'react';
import { Modal, Paper, Toolbar, IconButton, Typography, Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function ClosableModel({ children, ...props }) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        elevation={16}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 840,
          maxHeight: 640,
          pt: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar sx={{ pl: 0 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          <IconButton aria-label="close" onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Box sx={{
          m: 3,
          overflow: 'scroll',
        }}>
          {children}
        </Box>
      </Paper>
    </Modal>
  );
}