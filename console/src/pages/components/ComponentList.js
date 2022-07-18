import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Chip, Divider, Toolbar, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLongOutlined';
import StopIcon from '@mui/icons-material/StopCircleOutlined';
import StartIcon from '@mui/icons-material/PlayCircleOutline';
import RestartIcon from '@mui/icons-material/RestartAltOutlined';


function createData(
  name,
  os,
  source,
  created,
  status,
) {
  return { name, os, source, created, status };
}

const rows = [
  createData('System Log', 'Linux', '/var/log/syslog', new Date('2022-08-01T00:00:00'), 'active'),
  createData('Auth Log', 'Linux', '/var/log/auth.log', new Date('2022-08-02T00:00:00'), 'active'),
  createData('Boot', 'Linux', '/var/log/boot.log', new Date('2022-08-02T00:00:00'), 'disabled'),
  createData('Kernal', 'Linux', '/var/log/kern', new Date('2022-08-03T00:00:00'), 'pending'),
  createData('Cron Log', 'Linux', '/var/log/cron', new Date('2022-08-03T00:00:00'), 'disabled'),
];

function renderStatus(status) {
  switch (status) {
    case 'active':
      return <Chip label={status} color='success' size='small' />
    case 'disabled':
      return <Chip label={status} color='error' size='small' />
    case 'pending':
      return <Chip label={status} color='info' size='small' />
  }
}

function renderActions(status) {
  switch (status) {
    case 'active':
      return (
        <ButtonGroup size="small" variant="text" aria-label="component actions">
          <Button><StopIcon /></Button>
          <Button><RestartIcon /></Button>
        </ButtonGroup>
      )
    case 'disabled':
      return (
        <ButtonGroup size="small" variant="text" aria-label="component actions">
          <Button><StartIcon /></Button>
        </ButtonGroup>
      )
    case 'pending':
      return (
        <ButtonGroup size="small" variant="text" aria-label="component actions">
          <Button><StartIcon /></Button>
        </ButtonGroup>
      )
  }
}

function ComponentTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>OS</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell><ReceiptLongIcon /></TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.os}</TableCell>
              <TableCell>{row.source}</TableCell>
              <TableCell>{renderStatus(row.status)}</TableCell>
              <TableCell>{row.created.toString()}</TableCell>
              <TableCell>{renderActions(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ComponentList(props) {
  return (
    <Paper>
      <Toolbar sx={{ pl: 0 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Log Collectors
        </Typography>
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add
        </Button>
      </Toolbar>
      <Divider />
      <ComponentTable />
    </Paper>
  )
}

export default ComponentList;
