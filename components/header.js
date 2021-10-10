import React from "react";
import Cart from './cart'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Header = () => {
  return (
  <AppBar position="sticky">
    <Toolbar sx={{
      bgcolor: "#121212"
    }}>
      <Button href="/" style={{color: 'rgba(255, 255, 255, 0.87)'}}>
        Home
      </Button>
      <Button href="/products" style={{color: 'rgba(255, 255, 255, 0.87)'}}>
        Store
      </Button>
      <Cart />
      <Button href="https://www.ebay.com/str/btcomics" style={{color: 'rgba(255, 255, 255, 0.87)'}}>
        Ebay
      </Button>
    </Toolbar>
  </AppBar>
  )
}

export default Header;