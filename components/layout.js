import React from "react";
import Head from "next/head";
import Header from './header';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
import Cart from './cart'
import Grid from '@material-ui/core/Grid';

const Layout = ({ children, menu }) => {

    return (
        <div>
            {/* <Head>
                <title> Back in Time Comics and Toys </title>
            </Head>
            <Header menu={menu}/> */}
            <Grid container spacing={8} justifyContent="flex-start" direction="row">
              <Grid item xs>
              <Box
                sx={{
                  // display: 'flex',
                  // flexWrap: 'wrap',
                  // justifyContent: 'left',
                  typography: 'body1',
                  '& > :not(style) + :not(style)': {
                    ml: 2,
                  },
                }}
              >
                <Link href="/" underline="none" color="inherit">Home</Link>
                <Link href="/products" underline="none" color="inherit">Shop</Link>
                <Link href="https://www.ebay.com/str/btcomics" underline="none" color="inherit">Ebay</Link>
                <Cart />
              </Box>
              </Grid>
            </Grid>
            
            <main>{children}</main>
        </div>
    );
};

export default Layout;