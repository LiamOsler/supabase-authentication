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
        .from("Parts")
        .select("Model, Line, Cores, Threads")


      setParts(data);
    }

  return (
    <Container sx={{p: 4, pt: 14}} >
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Parts Catalog
      </Typography>
      {/* {JSON.stringify(parts)} */}
      <Grid container spacing={2}>
      {
        parts ? (
          <p>Loading</p>
        ) : (
            <Grid item xs={12} sm={6} md={4} >
              <Card>
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
              </Card>
            </Grid>
        )
      }
      </Grid>

    </Container>
  )
}

export default Parts;

