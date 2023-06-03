import Link from 'next/link'
import useSWR from 'swr'
import { Auth } from '@supabase/ui'
import { AppBar, Box, Container, Toolbar, Typography, Button, Card, CardContent, Grid, Tabs, Tab, List, ListItem, CardActions } from '@mui/material';

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
  const { data, error } = useSWR(
    session ? ['/api/getUser', session.access_token] : null,
    fetcher
  )
  const [authView, setAuthView] = useState('sign_in')

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') setAuthView('update_password')
        if (event === 'USER_UPDATED')
          setTimeout(() => setAuthView('sign_in'), 1000)
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return (
    <Container sx={{p: 4}} >
      <Typography color="primary" variant="h4" component="div" sx={{mb: 4}}>
        Welcome to Parts Central
      </Typography>
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        We've got the parts you need
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
              <Link href="/" passHref>
                <Button variant="text" color="primary">Browse Catalog</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} >
          <Card sx = {{height: "100%"}}>
            <CardContent>
              <Typography variant="h5">Suppliers</Typography>
              <Typography variant="body1">Discover a comprehensive list of reliable and trusted suppliers for all your automotive business needs.</Typography>
              </CardContent>
            <CardActions>
            <Link href="/" passHref>
                    <Button variant="text" color="primary">Browse Suppliers</Button>
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
            <Link href="/" passHref>
                    <Button variant="text" color="primary">Browse Clients</Button>
                  </Link>
            </CardActions>
          </Card>
        </Grid>

      </Grid>

      <Typography color="white" variant="h5" component="div" sx={{my: 4}}>
        About Us
      </Typography>

      <Tabs>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>

      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    </Container>

  )
}

export default Index
