import React, { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

import LoadingButton from '@mui/lab/LoadingButton';

import db from './db';


export default function ClassifyDialog(props) {
  const {
    groupName,
    groupId,
    open,
    onClose,
    setSnackbarText,
  } = props;
  
  const [name, setName] = useState(groupName);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(groupName);
  }, [groupName]);

  const onSubmit = async () => {
    setLoading(true);
    db.groups.update(groupId, { name }).then(() => {
      setLoading(false);
      setSnackbarText('Updated group name');
      onClose();
    }).catch((error) => {
      setError(error);
      setLoading(false);
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="check-dialog-title"
      aria-describedby="check-dialog-description"
    >
      <DialogTitle id="check-dialog-title">Edit group name</DialogTitle>
      <DialogContent>
        <DialogContentText id="check-dialog-description">
          Type in a new group name
        </DialogContentText>
        <TextField
          label="New group name"
          variant="standard"
          sx={{ mt: 2, width: '100%' }}
          value={name}
          onChange={(event) => setName(event.target.value)}

        />
        { error && 
          <Alert sx={{ mt: 2}} severity="error">Something when wrong: {error.message}</Alert>
        }

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton loading={loading} onClick={onSubmit} variant="contained">Update</LoadingButton>
      </DialogActions>
    </Dialog>
  );
}