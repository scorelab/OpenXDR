import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLongOutlined';
import MemoryIcon from '@mui/icons-material/MemoryOutlined';
import StorageIcon from '@mui/icons-material/StorageOutlined';

function createData(
  name,
  type,
  uptime,
) {
  return { name, type, uptime };
}

const rows = [
  createData('System Log', 'log_collector', '5 hrs'),
  createData('Auth Log', 'log_collector', '10 hrs'),
  createData('Flink-Instance-1', 'pu', '10 hrs'),
  createData('Flink-Instance-2', 'pu', '10 hrs'),
  createData('Kudu-Cluster-2', 'storage', '10 hrs')
];

function renderComponentType(type) {
  switch (type) {
    case 'log_collector':
      return 'Log Collector'
    case 'pu':
      return 'Processing Unit'
    case 'storage':
      return "Storage Cluster"
  }
}

function renderComponentTypeIcon(type) {
  switch (type) {
    case 'log_collector':
      return <ReceiptLongIcon />
    case 'pu':
      return <MemoryIcon />
    case 'storage':
      return <StorageIcon />
  }
}

function ActiveComponentList({logs}) {

  return (
    <React.Fragment>
      <Typography component="div" variant="h6" color="primary" gutterBottom>
        Active Components
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Uptime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{renderComponentTypeIcon('log_collector')}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{renderComponentType('log_collector')}</TableCell>
                <TableCell>{"N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ActiveComponentList;