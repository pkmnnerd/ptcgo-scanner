import React from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function CodeGroupMenu(props) {
  const {
    anchorEl,
    handleClose,
    handleCopy,
    handleCopyWithSet,
    handleDelete,
    handleCheck,
  } = props;
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
      <MenuItem onClick={() => handleCopy ? handleCopy() : handleClose()}>Copy codes</MenuItem>
      <MenuItem onClick={() => handleCopyWithSet ? handleCopyWithSet() : handleClose()}>Copy codes with set</MenuItem>
      <MenuItem onClick={() => handleCheck ? handleCheck() : handleClose()}>Check codes</MenuItem>
      <MenuItem onClick={() => handleDelete ? handleDelete() : handleClose()}>Delete group</MenuItem>
    </Menu>
  );
}