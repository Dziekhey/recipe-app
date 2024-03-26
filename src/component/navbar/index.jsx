import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="success" position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography to='/recipes' color='inherit' variant="h6" component={Link} sx={{ flexGrow: 1 }}>
            Recipe App
          </Typography>
          <Button to='/add-recipe' variant="contained" component={Link} color="success">Admin</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

{/* <AppBar color="success" position="static"></AppBar> */}