import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import './ComponentDetails.css';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

import * as ConsoleApi from '../../services';

function ComponentDetails({data, onComplete}) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (data !== null) {
      setValue('name', data.name)
      setValue('os', data.os)
      setValue('source', data.source)
    }
  }, [data]);

  const onCreate = (data) => {
    console.log("Create")
    var api = new ConsoleApi.DefaultApi();
    var requestData = ConsoleApi.LogsCreateRequest.constructFromObject(data);
    var callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(data)
      }
      onComplete(false);
    };
    api.create({'logsCreateRequest': requestData}, callback);
  };

  const onUpdate = (newData) => {
    console.log("Update")
    var api = new ConsoleApi.DefaultApi();
    var requestData = data;
    requestData.name = newData.name;
    requestData.os = newData.os;
    requestData.source = newData.source;
    var callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(data)
      }
      onComplete(false);
    };
    api.update(data.id, {'log': requestData}, callback);
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
          {...register("name")}
        />
        <div>
          <FormControl required variant="standard" sx={{ mb: 2, minWidth: 240 }}>
            <InputLabel>Operating System</InputLabel>
            <Select
              label="Operating System"
              defaultValue={'linux'}
              {...register("os", { required: true })}
            >
              <MenuItem value={'linux'}>Linux</MenuItem>
              <MenuItem value={'win'}>Windows</MenuItem>
              <MenuItem value={'macos'}>MacOS</MenuItem>
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
          {...register("source", { required: true })}
        />
        <Box sx={{float: 'right'}}>
        {data !== null ?
        <Button sx={{ ml: 1, mt: 4 }} variant="contained" disableElevation onClick={handleSubmit(onUpdate)}>UPDATE</Button>:
        <Button sx={{ ml: 1, mt: 4 }} variant="contained" disableElevation onClick={handleSubmit(onCreate)}>CREATE
        </Button>
        }
        </Box>
      </div>
    </Box>
  );
}

export default ComponentDetails;
