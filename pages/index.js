import Link from 'next/link'
import useSWR from 'swr'
import { Auth } from '@supabase/ui'
import { AppBar, Box, Container, Toolbar, Typography, Button, IconButton, Card, CardContent, Grid, Tabs, Tab, List, ListItem, CardActions } from '@mui/material';
import HardwareIcon from '@mui/icons-material/Hardware';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'

const fetcher = ([url, token]) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const Index = () => {
  const { user, session } = Auth.useUser()

  return (
    <Container sx={{p: 4, pt: 10}} >

      <Typography color="primary" variant="h4" component="div" sx={{mb: 4}}>
        Central Parts
      </Typography>
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Database
      </Typography>

      <Grid container 
        spacing={2}
      >

        <Grid item xs={12} sm={6} md={4} >
          <Card sx = {{height: "100%"}}>
            <CardContent>

              <Typography variant="h5">Parts Catalog</Typography>
              <Typography variant="body1">
              </Typography>
            </CardContent>

            <CardActions>
              <Link href="/parts" passHref>
                <Button variant="text" color="primary">View Parts</Button>
                <IconButton
                    size="large"
                    edge="start"
                    color="primary"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <HardwareIcon fontSize="large" />
                  </IconButton>
              </Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} >
          <Card sx = {{height: "100%"}}>
            <CardContent>
              <Typography variant="h5">Purchase Orders</Typography>
              <Typography variant="body1"></Typography>
              </CardContent>
            <CardActions>
            <Link href="/purchaseorders" passHref>
              <Button variant="text" color="primary">View Purchase Orders</Button>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <ReceiptLongIcon fontSize="large" />
              </IconButton>
              </Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} >
          <Card sx = {{height: "100%"}}>
            <CardContent>
              <Typography variant="h5">Clients</Typography>
              <Typography variant="body1"></Typography>
              </CardContent>
            <CardActions>
              <Link href="/clients" passHref>
                <Button variant="text" color="primary">View Clients</Button>
                <IconButton
                    size="large"
                    edge="start"
                    color="primary"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <PeopleIcon fontSize="large" />
                  </IconButton>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Typography color="white" variant="h5" component="div" sx={{my: 4}}>
        Authentication
      </Typography>

      <Grid container 
        spacing={2}
      >

        <Grid item xs={12} sm={6} md={4} >
          <Card sx = {{height: "100%"}}>
            <CardContent>
              <Typography variant="h5">My Account</Typography>
              {
                user ? (
                  <Typography variant="body1">
                    {user.email}
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    Not Signed In
                  </Typography>
                )
              }
            </CardContent>

            <CardActions>
              <Link href="/parts" passHref>
                <Button variant="text" color="primary">Manage Account</Button>
                <IconButton
                    size="large"
                    edge="start"
                    color="primary"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <ManageAccountsIcon fontSize="large" />
                  </IconButton>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

    </Container>

  )
}

export default Index
