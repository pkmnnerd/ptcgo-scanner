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
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import theme from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';

import db from './db';
import CodeGroupMenu from './CodeGroupMenu';
import { copyCodes, copyCodesWithSet, deleteGroup } from './common';

import { useLiveQuery } from 'dexie-react-hooks';

import { Link, useNavigate, useParams } from 'react-router-dom';
import ClassifyDialog from './ClassifyDialog';

export default function CodeGroupPage(props) {
  const { setActiveGroup, setSnackbarText } = props;
  const groupId = parseInt(useParams().groupId);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [checkDialogOpen, setCheckDialogOpen] = useState(false);

  const navigate = useNavigate();
  const group = useLiveQuery(
    () => db.groups.get(parseInt(groupId))
  )
  const codes = useLiveQuery(
    () => db.codes.where('groupId').equals(groupId).sortBy('timestamp')
  )
  const useDesktopUi = useMediaQuery(theme.breakpoints.up('sm'));
  
  const getSecondaryText = (codeObject) => {
    if (codeObject.status) {
      const updateTime = new Date(codeObject.checkTimestamp * 1000);
      const timeString = updateTime.toLocaleString();
      return `${codeObject.status} - Last checked ${timeString}`
    } else {
      return `Not checked`;
    }
  }

  const listElement = (
   codes?.length > 0
    ? <List dense disablePadding>
        { codes?.map((code) => (
          <ListItem disablePadding key={code.id}>
            <ListItemButton>
              <ListItemText primary={code.code} secondary={getSecondaryText(code)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    : <Typography sx={{p: '1em'}} align="center">No codes in this group</Typography>
  );
  const handleCopy = () => {
    copyCodes(groupId);
    setMenuAnchor(null);
    setSnackbarText('Copied');
  }

  const handleCopyWithSet = () => {
    copyCodesWithSet(groupId);
    setMenuAnchor(null);
    setSnackbarText('Copied');
  }

  const handleDelete = () => {
    setDeleting(true);
    setDeleteError(null);

    deleteGroup(groupId)
      .then((res) => {
        setDeleting(false);
        setDeleteDialogOpen(false);
        setSnackbarText(`Deleted group ${group?.name}`);
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
      <ClassifyDialog
        open={checkDialogOpen}
        onClose={() => setCheckDialogOpen(false)}
        groupId={groupId}
        setSnackbarText={setSnackbarText}
      />
    </>

  )

  if (useDesktopUi) {
    return (
      <Box>
      <Container>
          <Stack direction="row" spacing={1} alignItems="center" justifyItems="flex-start" sx={{p: 2}}>
            <IconButton onClick={() => navigate('/codes')}><ArrowBackIcon /></IconButton>
            <Typography variant="h5">{group?.name}</Typography>
            <Box sx={{flexGrow: 1}}/>
            <IconButton><EditIcon /></IconButton>
            <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)}><MoreVertIcon /></IconButton>
            <CodeGroupMenu
              anchorEl={menuAnchor}
              handleClose={() => setMenuAnchor(null)}
              handleCopy={handleCopy}
              handleCopyWithSet={handleCopyWithSet}
              handleDelete={() => {
                setMenuAnchor(null);
                setDeleteDialogOpen(true);
              }}
              handleCheck={() => {
                setMenuAnchor(null);
                setCheckDialogOpen(true);
              }}
            />
          </Stack>
      </Container>
          <Divider />
      <Container sx={{maxHeight: '80vh'}}>
        {popUps}
          {listElement}
          <Fab color="secondary" aria-label="Scan codes" variant="extended"
            sx={{
              position: 'absolute',
              bottom: 24,
              right: 24,
            }}
            onClick={() => {
              setActiveGroup(group);
              navigate('/');
            }}
          >
            <QrCodeScannerIcon sx={{mr: 1}}/>
            Scan codes
          </Fab>
      </Container>
      </Box>
    );
  }

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" sx={{ mr: 2 }} component={Link} to="/codes">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow: 1}}>{group?.name}</Typography>
          <IconButton color="inherit">
            <EditIcon />
          </IconButton>
          <IconButton color="inherit" onClick={(event) => setMenuAnchor(event.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
          <CodeGroupMenu
            anchorEl={menuAnchor}
            handleClose={() => setMenuAnchor(null)}
            handleCopy={handleCopy}
            handleCopyWithSet={handleCopyWithSet}
            handleDelete={() => {
              setMenuAnchor(null);
              setDeleteDialogOpen(true);
            }}
            handleCheck={() => {
              setMenuAnchor(null);
              setCheckDialogOpen(true);
            }}
          />
        </Toolbar>
      </AppBar>
      <Container disableGutters={codes?.length > 0} sx={{pt: '1em'}}>
        {popUps}
        {listElement}
      </Container>
      <Fab color="secondary" aria-label="Scan codes"
        sx={{
          position: 'absolute',
          bottom: (theme) => `calc(${theme.spacing(7)} + 16px)`,
          right: 16,
        }}
        onClick={() => {
          setActiveGroup(group);
          navigate('/');
        }}
      >
        <QrCodeScannerIcon />
      </Fab>
      </>
  );
}