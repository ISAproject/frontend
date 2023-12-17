import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import StepperComponent from './stepper-component';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
function ReserveEquipmentComponent({companyId}) {

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
          <StepperComponent handleClose={handleClose} companyId={companyId}/>
        </DialogContent>
      </Dialog>

      <ToastContainer 
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="colored"/>
    </React.Fragment>
    );
}

export default ReserveEquipmentComponent;