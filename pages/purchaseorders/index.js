import Link from 'next/link'
import { useEffect, useState } from "react";
import { CircularProgress, Box, Container, Typography, Button, IconButton, Card, CardContent, CardActions, CardActionArea, Grid } from '@mui/material';

import { supabase } from '../../lib/initSupabase'

function Parts(data) {

    const [purchaseOrders, setParts] = useState(null);

    useEffect(() => {
      getParts();
    }, []);

    async function getParts() {
        const { data, error } = await supabase
            .from("Purchase_Orders")
            .select("*");

      setParts(data);
    }

  return (
    <Container sx={{p: 4, pt: 14}} >
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Purchase_Orders925
      </Typography>
      <Grid container spacing={2}>
        {
          purchaseOrders ? (
            purchaseOrders.length > 0 ? (
                purchaseOrders.map((purchaseOrder) => (
                    <Grid item xs={12} sm={6} md={4} >
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <Link href = {`/purchaseorders/ordernumber/` + purchaseOrder["Order_Number"]}>
                                      <Typography  variant="h5">
                                          Order Number: {purchaseOrder["Order_Number"]}
                                      </Typography>
                                    </Link>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            ):(
              <Grid item xs={12} sm={6} md={4} >
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                      }}
                    >
                    <Typography  variant="h5">
                      No Parts Found
                    </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )
          ) : (
              <Grid item xs={12} sm={6} md={4} >
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
          )
        }
      </Grid>
    </Container>
  )
}

export default Parts;

