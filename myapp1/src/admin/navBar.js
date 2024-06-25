import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import BlossomIcon from '@mui/icons-material/LocalFlorist';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ToggleDarkMode from './toggleDarkMode'

const Navbar = () => {
  return (
    <AppBar position="static" style={{ background: '#FFC0CB' }}>
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu" style={{ marginRight: '16px' }}>
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <IconButton edge="start" color="inherit" aria-label="home" style={{ display:'flex', justifyContent:'start' }}>
            <BlossomIcon />
          </IconButton>
        </Typography>
        {/* <div className='dark-mode'><ToggleDarkMode /></div> */}
        <Link to={routes.home} style={{ color: 'white' }}><Button color="inherit">Home</Button></Link>
        {/* <Link to={routes.form} style={{ color: 'white' }}><Button color="inherit">Form</Button></Link> */}
        <Link to={routes.contact} style={{ color: 'white' }}><Button color="inherit">Contact</Button></Link>
        <Link to={routes.orchidList} style={{ color: 'white' }}><Button color="inherit">Manage Product</Button></Link>
        <div style={{paddingLeft:'1%'}}>
          <Link to={routes.login}>
        <AccountCircleIcon/>
        </Link> 
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
