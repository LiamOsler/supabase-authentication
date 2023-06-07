import Link from 'next/link'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { CircularProgress, Box, Container, Typography, Button, IconButton, Card, CardContent, CardActions, CardActionArea, Grid } from '@mui/material';

import { supabase } from '../../../../lib/initSupabase'

function Parts(data) {
    const router = useRouter();
    const [parts, setParts] = useState(null);

    useEffect(() => {
      getPart();
    }, [router.query.line]);

    async function getPart() {
        const query = await router.query.line;
        const { data, error } = await supabase
            .from("CPU_Lines")
            .select("*")
            .eq('Family', query)
            ;

      setParts(data);
    }

  return (
    <Container sx={{p: 4, pt: 14}} >
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Parts925
      </Typography>
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        {router.query.line}

      </Typography>
      <Grid container spacing={2}>
      {
          parts ? (
            parts.length > 0 ? (
              parts.map((part) => (
                <Grid item xs={6} sm={4} md={3} >
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <Typography  variant="h6">
                          {part["Manufacturer"]}
                        </Typography>
                        <Typography  variant="h6">
                          {part["Line"]}
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

