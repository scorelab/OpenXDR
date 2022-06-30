import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import WidgetsIcon from '@mui/icons-material/Widgets';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={NavLink} to="/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/editor">
            <ListItemIcon>
                <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Editor" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/components">
            <ListItemIcon>
                <WidgetsIcon />
            </ListItemIcon>
            <ListItemText primary="Components" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Other
        </ListSubheader>

        <ListItemButton component={NavLink}  to="/settings">
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItemButton>
    </React.Fragment>
);