import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

export default function ClassifyDialog(props) {
  const {
    open,
    onClose,
  } = props;
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="check-dialog-title"
      aria-describedby="check-dialog-description"
    >
      <DialogTitle id="check-dialog-title">Check codes</DialogTitle>
      <DialogContent>
        <DialogContentText id="check-dialog-description">
          Unfortunately, the process the check codes has been changed, so we can't automate the checking of codes. Until a 
          workaround is found, you can check you codes manually at
          {' '}
          <a href="https://redeem.tcg.pokemon.com/" target="_blank" rel="noopener noreferrer">
            https://redeem.tcg.pokemon.com
          </a>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
