import React, { useEffect, useState } from 'react';
import './App.css';
import { QrReader } from 'react-qr-reader';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

import CloseIcon from '@mui/icons-material/Close';

import Viewfinder from './Viewfinder';

import db from './db';

const CODE_REGEX = /^[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{3}-[A-Z0-9]{3}$/

const MUTED_KEY = 'ptcgo-scanner:muted';

export default function Scanner(props) {
  const { activeGroup } = props;

  const [codes, setCodes] = useState(new Set());
  const [text, setText] = useState('Scanning...');
  const [color, setColor] = useState('info');
  const [lastCode, setLastCode] = useState([]);
  const [permission, setPermission] = useState('prompt');
  const [open, setOpen] = useState(false);
  const [facingBack, setFacingBack] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!localStorage.getItem(MUTED_KEY)) {
    localStorage.setItem(MUTED_KEY, 'true')
  }
  const [muted, setMuted] = useState(localStorage.getItem(MUTED_KEY) && localStorage.getItem(MUTED_KEY) === 'true');
  localStorage.setItem(MUTED_KEY, muted.toString())


  useEffect(() => {
    setLoading(true);
    db.codes.where('groupId').equals(activeGroup).toArray()
      .then((savedCodes) => {
        savedCodes.forEach((code) => {
          codes.add(code.code);
        });
        setLoading(false);
      })
  }, [codes, activeGroup, setLoading])

  useEffect(() => {
    navigator.permissions.query({name:'camera'}).then(function(result) {
      setPermission(result.state);
      result.onchange = (res) => {
        setPermission(res.target.state);
      };
    });
  }, [setPermission]);

  if (permission === 'denied') {
    return (
      <Alert severity="error">Need camera permission</Alert>
    );
  }

  if (loading) {
    return ("Loading"
    );
  }

  const saveCode = (code, codes) => {
    codes.add(code)
    console.log(activeGroup)
    db.codes.add({
      id: `${activeGroup}_${code}`,
      groupId: activeGroup,
      code: code,
      timestamp: Math.floor(Date.now() / 1000),
    })
    db.groups.update(parseInt(activeGroup), {size: codes.size, updateTimestamp: Math.floor(Date.now()/1000)})
  }

  return (
    <Box>
      <Container maxWidth="sm" disableGutters>
        <QrReader
          key={`${activeGroup}_${facingBack}`}
          onResult={(result, error) => {
            if (!!result) {
              if (result.text.match(CODE_REGEX)) {
                const code = result.text;
                if (code !== lastCode[0]) {
                  if (codes.has(code)) {
                    setText(`Code ${code} already scanned.`);
                    setColor('warning');
                    if (localStorage.getItem(MUTED_KEY) === 'false') {
                      const audio = new Audio('/ptcgo-scanner/bump.mp3');
                      audio.play();
                    }
                  } else {
                    saveCode(code, codes);
                    setText(`${code} added.`);
                    setColor('success');
                    if (localStorage.getItem(MUTED_KEY) === 'false') {
                      const audio = new Audio('/ptcgo-scanner/blip.mp3');
                      audio.play();
                    }
                  }
                }
                lastCode[0] = code;
              }
            }
            
            if (!!error) {
              setText('Scanning...');
              setColor('info');
              lastCode[0] = '';
            }
          }}
          constraints={{ facingMode: facingBack ? 'environment' : 'user'}}
          scanDelay={200}
          ViewFinder={() =>
            <Viewfinder
              muted={muted}
              setMuted={setMuted}
              facing={facingBack}
              setFacing={setFacingBack}
            />
          }
          videoStyle={{objectFit: 'cover'}}
        /> 
      </Container>
      <Alert severity={color}>{text}</Alert>
      <Typography># of Codes: {codes.size}</Typography>
      <Button 
        onClick={() => {
          navigator.clipboard.writeText([...codes].join('\n'));
          setOpen(true);
        }}
      >
        Copy to clipboard
      </Button>
      <TextField
        multiline
        fullWidth
        value={[...codes].join('\n')}
        onChange={() => {return;}}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Copied"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}
