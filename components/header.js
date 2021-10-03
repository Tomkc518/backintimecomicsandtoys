import React from "react";
import Cart from './cart'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from "@material-ui/core";
import Button from '@mui/material/Button';

const Header = () => {
  return (
  <AppBar position="sticky">
    <Toolbar sx={{
      bgcolor: "#121212"
    }}>
      <Button href="/" style={{color: 'white'}}>
        Home
      </Button>
      <Button href="/products" style={{color: 'white'}}>
        Store
      </Button>
      <Cart />
      <Button href="https://www.ebay.com/str/btcomics" style={{color: 'white'}}>
        Ebay
      </Button>
    </Toolbar>
  </AppBar>
  )
}

export default Header;