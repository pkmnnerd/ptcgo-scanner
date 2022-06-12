import React from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function CodeGroupMenu(props) {
  const { anchorEl, handleClose } = props;
  console.log(anchorEl);
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Copy codes</MenuItem>
      <MenuItem onClick={handleClose}>Delete group</MenuItem>
    </Menu>
  );
}