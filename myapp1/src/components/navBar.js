import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from '@mui/material';
import BlossomIcon from '@mui/icons-material/LocalFlorist';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import { useAuth } from './authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar position="static" style={{ background: '#FFC0CB' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to={routes.home} style={{ color: 'white', textDecoration: 'none' }}>
            <IconButton edge="start" color="inherit" aria-label="home" style={{ display: 'flex', justifyContent: 'start' }}>
              <BlossomIcon />
              Orchid Shop
            </IconButton>
          </Link>
        </Typography>
        <Link to={routes.home} style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link to={routes.contact} style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit">Contact</Button>
        </Link>
        {user && (
          <Link to={routes.manageProducts} style={{ color: 'white', textDecoration: 'none' }}>
            <Button color="inherit">Manage Product</Button>
          </Link>
        )}
        <div style={{ paddingLeft: '1%' }}>
          {user ? (
            <div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to={routes.login} style={{ color: 'white', textDecoration: 'none' }}>
              <Button color="inherit">
                <AccountCircleIcon />
              </Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
