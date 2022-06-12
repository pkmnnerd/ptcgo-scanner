import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import theme from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';

import db from './db';
import CodeGroupMenu from './CodeGroupMenu';

import { useLiveQuery } from 'dexie-react-hooks';

import { useNavigate, useParams } from 'react-router-dom';

export default function CodeGroupPage(props) {
  const { setActiveGroup } = props;
  const groupId = parseInt(useParams().groupId);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const navigate = useNavigate();
  const group = useLiveQuery(
    () => db.groups.get(parseInt(groupId))
  )
  const codes = useLiveQuery(
    () => db.codes.where('groupId').equals(groupId).toArray()
  )
  const useDesktopUi = useMediaQuery(theme.breakpoints.up('sm'));

  const listElement = (
   codes?.length > 0
    ? <List dense disablePadding>
        { codes?.map((code) => (
          <ListItem disablePadding key={code.id}>
            <ListItemButton>
              <ListItemText primary={code.code} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    : <Typography sx={{p: '1em'}} align="center">No codes in this group</Typography>
  );
  const handleCopy = () => {
    const codeText = codes?.map((code) => code.code).join('\n');
    navigator.clipboard.writeText(codeText);
    setSnackbarOpen(true);
    setMenuAnchor(null);
  }

  const handleDelete = () => {
    setDeleting(true);
    setDeleteError(null);
    db.codes.where('groupId').equals(groupId)
      .delete()
      .then(() => db.groups.delete(parseInt(groupId)))
      .then((res) => {
        setDeleting(false);
        setDeleteDialogOpen(false);
        setActiveGroup(null);
        navigate('/codes');
      })
      .catch((err) => {
        setDeleteError(err);
        setDeleting(false);
      })

  }
  const popUps = (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Copied"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this code group, including all codes included in the group?
          </DialogContentText>
          { deleteError && 
            <Alert severity="error">Something when wrong: {deleteError.message}</Alert>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <LoadingButton loading={deleting} loadingPosition="end" endIcon={<DeleteIcon />} onClick={handleDelete} variant="contained">Delete</LoadingButton>
        </DialogActions>
      </Dialog>
    </>

  )

  if (useDesktopUi) {
    return (
      <Container sx={{pt: '1em'}}>
        {popUps}
        <Paper sx={{position: 'relative' ,minHeight: '70vh'}}>
          <Stack direction="row" spacing={1} alignItems="center" justifyItems="flex-start" sx={{p: 2}}>
            <Typography variant="h5">{group?.name}</Typography>
            <Box sx={{flexGrow: 1}}/>
            <IconButton><EditIcon /></IconButton>
            <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)}><MoreVertIcon /></IconButton>
            <CodeGroupMenu
              anchorEl={menuAnchor}
              handleClose={() => setMenuAnchor(null)}
              handleCopy={handleCopy}
              handleDelete={() => {
                setMenuAnchor(null);
                setDeleteDialogOpen(true);
              }}
            />
          </Stack>
          <Divider />
          {listElement}
          <Fab color="secondary" aria-label="Scan codes" variant="extended"
            sx={{
              position: 'absolute',
              bottom: 24,
              right: 24,
            }}
            onClick={() => {
              setActiveGroup(groupId);
              navigate('/');
            }}
          >
            <QrCodeScannerIcon sx={{mr: 1}}/>
            Scan codes
          </Fab>
        </Paper>
      </Container>
    );
  }

  return (<>
    <Container disableGutters={codes?.length > 0} sx={{pt: '1em'}}>
      {listElement}
    </Container>
      <Fab color="secondary" aria-label="Scan codes"
        sx={{
          position: 'absolute',
          bottom: (theme) => `calc(${theme.spacing(7)} + 16px)`,
          right: 16,
        }}
        onClick={() => {
          setActiveGroup(groupId);
          navigate('/');
        }}
      >
        <QrCodeScannerIcon />
      </Fab>
      </>
  );
}