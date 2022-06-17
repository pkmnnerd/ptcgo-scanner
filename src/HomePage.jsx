import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import { Link } from 'react-router-dom';

import db from './db';
import Scanner from './Scanner';
import { createNewGroup } from './common';


export default function ScanPage(props) {
  const { activeGroup, setActiveGroup } = props;

  if (activeGroup) {
    return (
      <Container sx={{ py: 1 }}>
        <Scanner activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      </Container>
    );
  }
  return (
    <Container sx={{pt: '1em'}}>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Card sx={{ height: '100%'}}>
            <CardContent>
              <Typography variant="h5">Start a new code group</Typography>
              <Typography>
                Start scanning a new group of PTCGO codes that are saved on your device
              </Typography>

            </CardContent>
            <CardActions>
              <Button
                endIcon={<QrCodeScannerIcon />}
                variant="outlined"
                onClick={() => {
                  createNewGroup()
                    .then((group) => setActiveGroup(group))
                }}
              >
                Start scanning new codes
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5">Update an existing code group</Typography>
              <Typography>
                View your previous code groups and scan new codes into the existing group
              </Typography>
            </CardContent>
            <CardActions>
              <Button endIcon={<ArrowForwardIcon />} variant="outlined" component={Link} to="/codes" >
                Add to existing code groups
              </Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>
    </Container>
    
  );
}