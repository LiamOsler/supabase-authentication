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
        const { data, error } = await supabase
            .from("CPU_Families")
            .select("Manufacturer, Family");

      setParts(data);
    }

  return (
    <Container sx={{p: 4, pt: 14}} >
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Parts925
      </Typography>
      <Grid container spacing={2}>
        {
          parts ? (
            parts.length > 0 ? (
              parts
              // .sort(function(a, b) {
              //   if(a["Family"].toLowerCase() < b["Family"].toLowerCase()) return -1;
              //   if(a["Family"].toLowerCase() > b["Family"].toLowerCase()) return 1;
              //   return 0;
              //  })
              .map((part) => (
                <Grid item xs={6} sm={4} md={3} >
                  <Card>
                    <Link href = {`/parts/cpufamily/` + part["Family"]}>
                        <CardActionArea>
                          <CardContent>
                            <Typography  variant="h6">
                              {part["Manufacturer"]}
                            </Typography>
                            <Typography  variant="body1">
                              {part["Family"]}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Link>
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

