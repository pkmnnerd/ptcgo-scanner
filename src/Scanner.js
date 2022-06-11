import React, { useEffect, useState } from 'react';
import './App.css';
import { QrReader } from 'react-qr-reader';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import Viewfinder from './Viewfinder';

const CODE_REGEX = /^[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{3}-[A-Z0-9]{3}$/

const MUTED_KEY = 'ptcgo-scanner:muted';

export default function Scanner() {
  const [codes, setCodes] = useState(new Set());
  const [text, setText] = useState('Scanning...');
  const [color, setColor] = useState('info');
  const [lastCode, setLastCode] = useState([]);
  const [permission, setPermission] = useState('prompt');
  const [open, setOpen] = useState(false);
  const [facingBack, setFacingBack] = useState(true);

  if (!localStorage.getItem(MUTED_KEY)) {
    localStorage.setItem(MUTED_KEY, 'true')
  }
  const [muted, setMuted] = useState(localStorage.getItem(MUTED_KEY) && localStorage.getItem(MUTED_KEY) === 'true');
  localStorage.setItem(MUTED_KEY, muted.toString())

  console.log(facingBack);

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

  return (
    <>
      <Container maxWidth="sm" disableGutters>
        <QrReader
          key={facingBack ? 'a' : 'b'}
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
                    codes.add(code);
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
      />
    </>
  );
}
