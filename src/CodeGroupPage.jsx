import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import theme from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';

import db from './db';

import { useLiveQuery } from 'dexie-react-hooks';

import { useNavigate, useParams } from 'react-router-dom';

export default function CodeGroupPage(props) {
  const { setActiveGroup } = props;
  const { groupId } = useParams();
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
    : "No codes in this groups"
  );

  if (useDesktopUi) {
    return (
      <Container sx={{pt: '1em'}}>
        <Paper sx={{position: 'relative'}}>
          <Stack direction="row" spacing={1} alignItems="center" justifyItems="flex-start" sx={{p: 2}}>
            <Typography variant="h5">{group?.name}</Typography>
            <Box sx={{flexGrow: 1}}/>
            <IconButton><EditIcon /></IconButton>
            <IconButton><MoreVertIcon /></IconButton>
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

  return (
    <Container disableGutters={codes?.length > 0} sx={{pt: '1em', position: 'relative', height: '100%'}}>
      {listElement}
      <Fab color="secondary" aria-label="Scan codes"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        onClick={() => {
          setActiveGroup(groupId);
          navigate('/');
        }}
      >
        <QrCodeScannerIcon />
      </Fab>
    </Container>
  );
}