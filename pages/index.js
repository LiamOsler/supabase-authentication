import Link from 'next/link'
import useSWR from 'swr'
import { Auth } from '@supabase/ui'
import { Container, Typography, Button, IconButton, Card, CardContent, CardActions, CardActionArea, Grid } from '@mui/material';
import HandymanIcon from '@mui/icons-material/Handyman';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import { supabase } from '../lib/initSupabase'


export default function Index({ user }) {
  return (
    <Container sx={{p: 4, pt: 14}} >

      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Database
      </Typography>

      <Grid container spacing={2}>

      <Grid item xs={12} sm={6} md={4} >
          <Card sx = {{height: "100%"}}>
          <Link href = "/parts" passHref>
              <CardActionArea>
            <CardContent>
              <Typography variant="h5">Parts Catalog</Typography>
              <Typography variant="body1"></Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <Link href = "/parts" passHref>

            <CardActions>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ ml: .1 }}
              >
                <HandymanIcon fontSize="large" />
              </IconButton>
              <Button variant="text" color="primary">Parts Catalog</Button>

            </CardActions>
          </Link>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} >
          <Card sx = {{height: "100%"}}>
          <Link href = "/purchaseorders" passHref>
              <CardActionArea>
            <CardContent>
              <Typography variant="h5">Purchase Orders</Typography>
              <Typography variant="body1"></Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <Link href = "/purchaseorders" passHref>

            <CardActions>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ ml: .1 }}
              >
                <ReceiptLongIcon fontSize="large" />
              </IconButton>
              <Button variant="text" color="primary">Purchase Orders</Button>

            </CardActions>
          </Link>
          </Card>
        </Grid>


        <Grid item xs={12} sm={6} md={4} >
          <Card sx = {{height: "100%"}}>
          <Link href = "/clients" passHref>
              <CardActionArea>
            <CardContent>
              <Typography variant="h5">Client List</Typography>
              <Typography variant="body1"></Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <Link href = "/clients" passHref>

            <CardActions>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ ml: .1 }}
              >
                <PeopleIcon fontSize="large" />
              </IconButton>
              <Button variant="text" color="primary">Client List</Button>

            </CardActions>
          </Link>
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
                <Link href = "/login" passHref>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h5">My Account</Typography>
                      <Typography variant="body1">
                      {
                        user ? (
                            user.email
                        ) : (
                            "Not Signed In"
                        )
                      }
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions>
                {
                    user ? (
                      <Link href = "/login" passHref>
                        <IconButton
                            size="large"
                            edge="start"
                            color="primary"
                            aria-label="menu"
                            sx={{ ml: .1 }}
                            >
                            <ManageAccountsIcon fontSize="large" />
                          </IconButton>
                          <Button variant="text" color="primary">Manage Account</Button>

                      </Link>
                    ) : (
                      <Link href = "/login" passHref>
                        <IconButton
                            size="large"
                            edge="start"
                            color="primary"
                            aria-label="menu"
                            sx={{ ml: .1 }}
                            >
                            <AccountCircleIcon fontSize="large" />
                          </IconButton>
                          <Button variant="text" color="primary">Login</Button>

                      </Link>
                    )
                  }
                </CardActions>

            </Card>

        </Grid>

        {
          user ? (
            <Grid item xs={12} sm={6} md={4} >
            <Card sx = {{height: "100%"}}>
              <CardContent>
                <Typography variant="h5">Billing</Typography>
                <Typography variant="body1">
                  Your Plan: Free
                </Typography>
              </CardContent>
  
              <CardActions>
                <Link href="/billing" passHref>
                  <Button variant="text" color="primary">View Plan</Button>
                  <IconButton
                      size="large"
                      edge="start"
                      color="primary"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >
                      <CreditCardIcon fontSize="large" />
                    </IconButton>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          ) : ""
        }
        </Grid>


    </Container>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  // if (!user) {
  //   // If no user, redirect to index.
  //   return { props: {}, redirect: { destination: '/', permanent: false } }
  // }

  // If there is a user, return it.
  return { props: { user } }
}

