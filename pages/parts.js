import Link from 'next/link'
import { useEffect, useState } from "react";
import { Container, Typography, Button, IconButton, Card, CardContent, CardActions, CardActionArea, Grid } from '@mui/material';

import { supabase } from '../lib/initSupabase'
console.log(supabase);

function Parts(data) {

    const [parts, setParts] = useState([]);

    useEffect(() => {
      getParts();
    }, []);

    async function getParts() {
      const { data } = await supabase.from("Parts").select();
      setParts(data);
    }

  return (
    <Container sx={{p: 4, pt: 14}} >
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Parts Catalog
      </Typography>
      {/* {JSON.stringify(parts)} */}
      <Grid container>
      {
        parts.map((part) => (
            <Grid item>

            <p>
               {part["Model"]}
            </p>
            </Grid>
        ))
      }
      </Grid>
    </Container>
  )
}

export default Parts;

