import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Chip, Divider, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLongOutlined';
import StopIcon from '@mui/icons-material/StopCircleOutlined';
import StartIcon from '@mui/icons-material/PlayCircleOutline';
import RestartIcon from '@mui/icons-material/RestartAltOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ComponentDetails from '../component_details/ComponentDetails';
import ClosableModel from '../../components/ClosableModel';

import * as ConsoleApi from '../../services';

function renderStatus(status) {
  switch (status) {
    case 'active':
      return <Chip label={status} color='success' size='small' />
    case 'disabled':
      return <Chip label={status} color='error' size='small' />
    case 'pending':
      return <Chip label={status} color='info' size='small' />
    default:
      break;
  }
}

function renderActions(id, status, handleAction, handleMenu) {
  switch (status) {
    case 'active':
      return (
        <ButtonGroup size="small" variant="text" aria-label="component actions">
          <Button onClick={() => handleAction(id, 'stop')}><StopIcon /></Button>
          <Button onClick={() => handleAction(id, 'restart')}><RestartIcon /></Button>
        </ButtonGroup>
      )
    case 'disabled':
      return (
        <ButtonGroup size="small" variant="text" aria-label="component actions">
          <Button onClick={() => handleAction(id, 'start')}><StartIcon /></Button>
          <Button onClick={(event) => handleMenu(event, id)}><MoreVertIcon /></Button>
        </ButtonGroup>
      )
    case 'pending':
      return (
        <ButtonGroup size="small" variant="text" aria-label="component actions">
          <Button onClick={() => handleAction(id, 'start')}><StartIcon /></Button>
          <Button onClick={(event) => handleMenu(event, id)}><MoreVertIcon /></Button>
        </ButtonGroup>
      )
    default:
      break;
  }
}


function ComponentTable({ updated, onUpdate }) {
  const [open, setOpen] = React.useState(null);
  const selectComp = (item) => setOpen(item);
  const deselectComp = () => setOpen(null);

  const [logs, setLogs] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenu = (event, id) => {
    setAnchorEl({'anchor':event.currentTarget, 'id': id});
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (updated === false) {
      var api = new ConsoleApi.DefaultApi()
      var callback = function (error, data, response) {
        if (error) {
          console.error(error);
        } else {
          console.log('API called successfully. Returned data: ' + data);
          console.log(data)
          setLogs(data)
        }
        onUpdate(true)
      };
      api.getAll(callback);
    }
  }, [updated])

  const onAction = (log_id, action) => {
    console.log("Action: " + action)
    var api = new ConsoleApi.DefaultApi();
    var requestData = new ConsoleApi.LogsActionRequest(action);
    var callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(data)
      }
      onUpdate(false);
    };
    api.action(log_id, {'logsActionRequest': requestData}, callback);  
  };

  const onDelete = () => {
    console.log("Delete: " + anchorEl.id)
    var api = new ConsoleApi.DefaultApi();
    var callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(data)
      }
      handleMenuClose();
      onUpdate(false);
    };
    api.callDelete(anchorEl.id, callback);  
  };

  return (
    <>
      <ClosableModel open={open !== null} onClose={deselectComp} title={open !== null ? "Update - " + open.name : ''}>
        <ComponentDetails data={open} onComplete={(isOpen) => {
          setOpen(null);
          onUpdate(false);
        }} />
      </ClosableModel>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>OS</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><ReceiptLongIcon /></TableCell>
                <TableCell 
                sx={{textDecoration: 'underline', cursor: 'pointer'}} 
                component="th" scope="row" onClick={() => {selectComp(row)}}>
                  {row.name}
                </TableCell>
                <TableCell>{row.os}</TableCell>
                <TableCell>{row.source}</TableCell>
                <TableCell>{renderStatus(row.status)}</TableCell>
                <TableCell>{renderActions(row.id, row.status, onAction, handleMenu)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl !== null ? anchorEl.anchor : null}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}

function ComponentList(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [updated, setUpdated] = React.useState(false);

  return (
    <>
      <ClosableModel open={open} onClose={handleClose} title={'Add Log Collector'}>
        <ComponentDetails data={null} onComplete={(isOpen) => {
          setOpen(isOpen);
          setUpdated(false);
        }} />
      </ClosableModel>
      <Paper>
        <Toolbar sx={{ pl: 0 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Log Collectors
          </Typography>

          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpen}>Add</Button>
        </Toolbar>
        <Divider />
        <ComponentTable updated={updated} onUpdate={(isUpdated) => { setUpdated(isUpdated) }} />
      </Paper>
    </>
  )
}

export default ComponentList;
