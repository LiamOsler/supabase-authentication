import { Auth } from '@supabase/ui'
import { supabase } from '../lib/initSupabase'
import './../style.css'

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f50057',
    },
    secondary: {
      main: '#eeeeee',
    },
  },
    typography: {
      fontFamily: [
        'courier new',
        'courier',
      ].join(',')
    }
  }

);

import Link from 'next/link'


async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}

function Navigation() {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar color="primary">
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Button variant="text" color="primary">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                  Central Part
                  </Typography>
              </Button>
            </Link>
          </Box>

          <Box >
            <Link href="/login" passHref>
              <IconButton
                size="large"
                edge="end"
                color="primary"
                aria-label="menu"
              >
                <AccountCircleIcon />
              </IconButton>
            </Link>
          </Box>

          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
        <Navigation />
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Component {...pageProps} />
        </Auth.UserContextProvider>
    </ThemeProvider>
  )
}
