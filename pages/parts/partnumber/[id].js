import Link from 'next/link'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { CircularProgress, Box, Container, Typography, Button, IconButton, Card, CardContent, CardActions, CardActionArea, Grid } from '@mui/material';

import { supabase } from '../../../lib/initSupabase'

function Parts(data) {
    const router = useRouter();
    const [part, setPart] = useState(null);

    useEffect(() => {
      getPart();
    }, [router.query.id]);

    async function getPart() {
        const query = await router.query.id;
        const { data, error } = await supabase
            .from("Parts")
            .select("*")
            .eq('Part_Number', query)
            ;

      setPart(data);
    }

  return (
    <Container sx={{p: 4, pt: 14}} >
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Parts925
      </Typography>
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
      {JSON.stringify(part)}

      </Typography>
      <Grid container spacing={2}>
        {part ? (
            "Data"
          ) : (
            "No Data"
          )
        }
      </Grid>
    </Container>
  )
}

export default Parts;

