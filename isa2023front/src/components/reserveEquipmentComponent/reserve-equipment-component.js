import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import StepperComponent from './stepper-component';
import { Box } from '@mui/material';
function ReserveEquipmentComponent() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
   
    return (
    <React.Fragment >
      <Button variant="contained" color='secondary' onClick={handleClickOpen}>  
        Reserve equipment
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth > 
        <DialogTitle>Reserve</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Steps:
          </DialogContentText>
          <StepperComponent/>
        </DialogContent>
      </Dialog>
    </React.Fragment>
    );
}

export default ReserveEquipmentComponent;