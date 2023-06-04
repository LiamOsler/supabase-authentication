import Link from 'next/link'
import { useEffect, useState } from "react";
import { CircularProgress, Box, Container, Typography, Button, IconButton, Card, CardContent, CardActions, CardActionArea, Grid } from '@mui/material';

import { supabase } from '../../lib/initSupabase'

function Parts(data) {

    const [parts, setParts] = useState([]);

    useEffect(() => {
      getParts();
    }, []);

    async function getParts() {
      const { data } = await supabase
        .from("Parts")
        .select("Model, Family, Cores, Threads")


      setParts(data);
    }

  return (
    <Container sx={{p: 4, pt: 14}} >
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Parts Catalog
      </Typography>
      {/* {JSON.stringify(parts)} */}
      <Grid container spacing={2}
>
      { parts.length > 0 ? (
        parts.map((part) => (
            <Grid item xs={12} sm={6} md={4} >
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography  variant="h5">
                      {part["Model"]}
                    </Typography>
                    <Typography  variant="h6">
                      {part["Family"]}
                    </Typography>
                    <Typography  variant="p">
                      Cores: {part["Cores"]}
                    </Typography>
                    <br/>
                    <Typography  variant="p">
                      Threads: {part["Threads"]}
                    </Typography>
                    </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
        ))
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>      
      )
      }
      </Grid>
    </Container>
  )
}

export default Parts;

