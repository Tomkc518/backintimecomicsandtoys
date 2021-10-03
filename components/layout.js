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
            <Head>
                <title> Back in Time Comics and Toys </title>
            </Head>
            <Header />
            
            <main>{children}</main>
        </div>
    );
};

export default Layout;