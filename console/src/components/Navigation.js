import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import WidgetsIcon from '@mui/icons-material/WidgetsOutlined';
import DesignServicesIcon from '@mui/icons-material/DesignServicesOutlined';
import { NavLink } from 'react-router-dom';
import { Divider, List } from '@mui/material';

const mainList = (
    <React.Fragment>
        <ListItemButton component={NavLink} to="/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/editor">
            <ListItemIcon>
                <DesignServicesIcon />
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


const secondaryList = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Other
        </ListSubheader>

        <ListItemButton component={NavLink} to="/settings">
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton component={NavLink} to="/about">
            <ListItemIcon>
                <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
        </ListItemButton>
    </React.Fragment>
);

function Navigation() {
    return <List component="nav" >
        {mainList}
        <Divider sx={{ my: 1 }} />
        {secondaryList}
    </List>
};


export default Navigation;

