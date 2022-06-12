import React from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import db from './db';

import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';

import theme from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';

const getSecondaryText = (group) => {
  const createTime = new Date(group.timestamp * 1000);
  const timeString = createTime.toLocaleString();
  if (group.size === 1) {
    return `1 code - Created ${timeString}`;
  }
  return `${group.size || 0} codes - Created ${timeString}`;
}

export default function CodeGroupsPage(props) {
  const groups = useLiveQuery(
    () => db.groups.toArray()
  )

  const listElement = (
    <List disablePadding>
      { groups?.map((group) => (
        <ListItem disablePadding key={group.id}>
          <ListItemButton component={Link} to={`/codes/${group.id}`}>
            <ListItemText primary={group.name} secondary={getSecondaryText(group)}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const useDesktopUi = useMediaQuery(theme.breakpoints.up('sm'));

  if (useDesktopUi) {
    return (
      <Container>
        <Paper sx={{my: 2}}>
          <Typography variant="h5" sx={{p: 2}}>Scanned codes</Typography>
          <Divider />
          {listElement}
        </Paper>
      </Container>
    );
  }

  return (
    <Container disableGutters>
      {listElement}
    </Container>
  );
}