import React, { useState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

import LoadingButton from '@mui/lab/LoadingButton';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { checkFirstCode, checkCodes } from './common';

export default function ClassifyDialog(props) {
  const {
    groupId,
    open,
    onClose,
  } = props;
  
  const [cookie, setCookie] = useState('');
  const [error, setError] = useState('');
  const [checkingFirst, setCheckingFirst] = useState(false);

  const onCheck = () => {
    setCheckingFirst(true)
    checkFirstCode(groupId, cookie)
    .then(() => {
      setCheckingFirst(false);
      onClose(true);
      checkCodes(groupId, cookie)
    })
    .catch((error) => {
      setError(error);
      setCheckingFirst(false);
    });
    ;
  }

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
          To check your codes, you must first enter your Pokemon.com cookies below.<br /><br />
          To get your credentials:<br />
          1. In a desktop Chrome browser, go to <a href="https://pokemon.com/redeem" target="_blank">https://pokemon.com/redeem</a> and log in.<br />
          2. Complete the Captcha.<br />
          3. Paste in a random string ("test" for example) and verify the code<br />
          4. Click on the lock on the left of the address bar and click "Cookies"<br />
          5. Expand www.pokemon.com &gt; Cookies and click on op_session_id<br />
          6. Copy the value of "Content" and paste it below
        </DialogContentText>
        <TextField
          label="op_session_id"
          variant="standard"
          sx={{ mt: 2, width: '100%' }}
          value={cookie}
          onChange={(event) => setCookie(event.target.value)}

        />
        { error && 
          <Alert sx={{ mt: 2}} severity="error">Something when wrong: {error.message}</Alert>
        }

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton loading={checkingFirst} loadingPosition="end" endIcon={<ArrowForwardIcon />} onClick={onCheck} variant="contained">Check codes</LoadingButton>
      </DialogActions>
    </Dialog>
  );
}