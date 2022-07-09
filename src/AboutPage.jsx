import React from 'react';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function AboutPage(props) {
  return (
    <Container sx={{pt: '1em'}}>
      <Stack spacing={1}>
        <Typography variant="h5">
          PTCGO Scanner
        </Typography>
        <Typography>
          Created by Brian Liu
        </Typography>
        <Typography>
          PTCGO Scanner is a fast QR code scanner for Pokemon TCG Online code cards. You can organize codes into groups and all data is saved locally in your browser.
        </Typography>
        <Typography>
          If you're interested in selling your codes, here are a few reputable sites you can sell to:
        </Typography>
        <ul>
          <li><a href="https://www.cardcaverntradingcards.com/pages/buylist" target="blank" rel="noopener noreferrer">Card Cavern</a></li>
          <li><a href="https://ptcgo.co/sell-ptcgo-code-pokemon/" target="blank" rel="noopener noreferrer">PTCGO.co</a></li>
        </ul>
        <Typography>
          This site is not affiliate with the Pokemon Company, The Pokemon TCG, or any of the above sites in any way.
        </Typography>
        <Typography>
          View my other projects at <a href="https://jumpydoll.com/users/pkmnnerd" target="_blank" rel="noreferrer">jumpydoll.com/users/pkmnnerd</a>. Want to host your own side projects just like this? Check out <a href="https://jumpydoll.com" target="_blank" rel="noreferrer">JumpyDoll</a>, the easiest way to
          start your own side projects.
        </Typography>
      </Stack>
      <List dense disablePadding>
        <ListItem disablePadding disableGutters>
          <ListItemButton href="https://github.com/pkmnnerd/ptcgo-scanner" target="_blank" disableGutters>
            <ListItemAvatar sx={{minWidth: '2.5rem'}}>
              <Avatar
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                sx={{width: '1.5rem', height: '1.5rem'}}
              />
            </ListItemAvatar>
            <ListItemText primary="GitHub" secondary="pkmnnerd/ptcgo-scanner" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding disableGutters>
          <ListItemButton href="https://jumpydoll.com/users/pkmnnerd/applications/ptcgo-scanner" target="_blank" disableGutters>
            <ListItemAvatar sx={{minWidth: '2.5rem'}}>
              <Avatar
                src="https://jumpydoll.com/favicon.ico"
                variant="rounded"
                sx={{width: '1.5rem', height: '1.5rem'}}
              />
            </ListItemAvatar>
            <ListItemText primary='JumpyDoll' secondary='pkmnnerd/ptcgo-scanner' />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
}
