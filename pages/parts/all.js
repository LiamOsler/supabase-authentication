import Link from 'next/link'
import { useEffect, useState } from "react";
import { CircularProgress, Box, Container, Typography, Button, IconButton, Card, CardContent, CardActions, CardActionArea, Grid } from '@mui/material';

import { supabase } from '../../lib/initSupabase'

function Parts(data) {

    const [parts, setParts] = useState(null);

    useEffect(() => {
      getParts();
    }, []);

    async function getParts() {
      const { data } = await supabase
        .from("Parts925")
        .select("Manufacturer, Product, CPU_Cores, CPU_Threads")  

      setParts(data);
    }

  return (
    <Container sx={{p: 4, pt: 14}} >
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Parts Catalog
      </Typography>

      <Grid container spacing={2}>
        {
          parts ? (
            parts.length > 0 ? (
              parts.map((part) => (
                <Grid item xs={12} sm={6} md={4} >
                  <Card sx = {{height: "100%"}}>
                    <CardActionArea sx = {{height: "100%"}}>
                      <CardContent>
                        <Typography  variant="h5">
                          {part["Manufacturer"]}
                        </Typography>
                        <Typography  variant="h5">
                          {part["Product"]}
                        </Typography>
                        <Typography  variant="h6">
                          {part["Family"]}
                        </Typography>
                        <Typography  variant="body1">
                          Cores: {part["CPU_Cores"]}
                        </Typography>
                        <br/>
                        <Typography  variant="body1">
                          Threads: {part["CPU_Threads"]}
                        </Typography>
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

