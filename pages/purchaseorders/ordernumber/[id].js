import Link from 'next/link'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { CircularProgress, Box, Container, Typography, Button, IconButton, Card, CardContent, CardActions, CardActionArea, Grid } from '@mui/material';

import { supabase } from '../../../lib/initSupabase'

function Parts(data) {
    const router = useRouter();
    const [purchaseOrder, setPurchaseOrder] = useState(null);

    useEffect(() => {
      getPurchaseOrder();
    }, [router.query.id]);

    async function getPurchaseOrder() {
        const query = await router.query.id;
        const { data, error } = await supabase
            .from("Purchase_Orders")
            .select("*")
            .eq('Order_Number', query)
            ;

      setPurchaseOrder(data);
    }

  return (
    <Container sx={{p: 4, pt: 14}} >
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
        Purchase_Orders925
      </Typography>
      <Typography color="white" variant="h5" component="div" sx={{mb: 4}}>
      {JSON.stringify(purchaseOrder)}

      </Typography>
      <Grid container spacing={2}>
        {purchaseOrder ? (
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

