import React from 'react';
import Box from '@mui/material/Box';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export default function ViewFinder(props) {
  const { muted, setMuted, facing, setFacing } = props;
  const VolumeIcon = muted ? VolumeOffIcon : VolumeUpIcon;
  return (
    <Box sx={{position: 'absolute', bottom: '0px', left: '0px', height: '3rem', width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: '1', p: '0px'}}>
      <CameraswitchIcon
        sx={{position: 'absolute', bottom: '0.5rem', left: '1rem', zIndex: '1', fontSize: '2rem', color: 'white'}}
        onClick={() => setFacing(!facing)}
      />
      <VolumeIcon
        sx={{position: 'absolute', bottom: '0.5rem', right: '1rem', zIndex: '1', fontSize: '2rem', color: 'white'}}
        onClick={() => setMuted(!muted)}
      />
    </Box>
  );
}