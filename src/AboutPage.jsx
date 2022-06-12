import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useNavigate, useParams } from 'react-router-dom';

export default function AboutPage(props) {
  return (
    <Container sx={{pt: '1em'}}>
      <Typography variant="h5">
        PTCGO Scanner
      </Typography>
      <Typography>
        Created by Brian Liu
      </Typography>
      <Typography>
        View my other projects at <a href="https://jumpydoll.com/users/pkmnnerd" target="_blank" rel="noreferrer">https://jumpydoll.com/useres/pkmnnerd</a>
      </Typography>
      <Typography>
        Want to host your own side projects just like this? Check out <a href="https://jumpydoll.com" target="_blank" rel="noreferrer">JumpyDoll</a>, the easiest way to
        start your own side projects.
      </Typography>
    </Container>
  );
}