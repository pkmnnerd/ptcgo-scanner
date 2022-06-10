import React, { useEffect,useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { QrReader } from 'react-qr-reader';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const CODE_REGEX = /^[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{3}-[A-Z0-9]{3}$/


function App() {
  const [codes, setCodes] = useState(new Set());
  const [text, setText] = useState('Scanning...');
  const [color, setColor] = useState('info');
  const [lastCode, setLastCode] = useState([]);
  const [deviceId, setDeviceId] = useState('');
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState('prompt');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    navigator.permissions.query({name:'camera'}).then(function(result) {
      setPermission(result.state);
      result.onchange = (res) => {
        setPermission(res.target.state);
      };
    });
  }, [setPermission]);

  useEffect(() => {
    if (permission === 'prompt') {
      navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}}).then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      });
    }
    if (permission === 'granted') {
      navigator.mediaDevices.enumerateDevices()
        .then((result) => {
          const devices = result.filter(device => device.kind === 'videoinput');
          setDevices(devices);
          //setDeviceId(devices[0].deviceId);
          setLoading(false);
        });
    }
  },[setDeviceId, setDevices, setLoading, permission]);

  if (permission === 'prompt') {
    return (
      <Container>
        <Typography variant="h3" align="center">Scan PTCGO QR codes</Typography>
        <Typography variant="h5" align="center">Waiting for permission</Typography>
      </Container>
    );
  }

  if (permission === 'denied') {
    return (
      <Container>
        <Typography variant="h3" align="center">Scan PTCGO QR codes</Typography>
        <Alert severity="error">Need camera permission</Alert>
      </Container>
    );
  }


  if (deviceId === '') {
    return (
      <Container>
        <Typography variant="h3" align="center">Scan PTCGO QR codes</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select a camera</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={deviceId}
            label="Select a camera"
            onChange={event => setDeviceId(event.target.value)}
          >
            { devices.map(device => <MenuItem value={device.deviceId} key={device.deviceId}>{device.label}</MenuItem>) }
          </Select>
        </FormControl>
      </Container>
    );
  }
  //navigator.mediaDevices.getUserMedia({camera: {facingMode: 'environment'}});
  return (
    <Container>
      <Typography variant="h3" align="center">Scan PTCGO QR codes</Typography>
      
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            if (result.text.match(CODE_REGEX)) {
              const code = result.text;
              if (code !== lastCode[0]) {
                if (codes.has(code)) {
                  setText(`Code ${code} already scanned.`);
                  setColor('warning');
                  const audio = new Audio('bump.mp3');
                  audio.play();
                } else {
                  codes.add(code);
                  setText(`${code} added.`);
                  setColor('success');
                  const audio = new Audio('blip.mp3');
                  audio.play();
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
        constraints={{ deviceId }}
        scanDelay={200}
      /> 
      <Alert severity={color}>{text}</Alert>
      <Typography># of Codes: {codes.size}</Typography>
      <Button 
      onClick={() => {
        navigator.clipboard.writeText([...codes].join('\n'));
        setOpen(true);
      }}>
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

    </Container>
  );
}

export default App;
