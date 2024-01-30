import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import StepperComponent from './stepper-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetUserByUsername } from '../../services/UserService';
function ReserveEquipmentComponent({companyId}) {

  useEffect(()=>{
    GetUserByUsername(authUser.username).then((res)=>{
      setUser(res.data);
      
    });

  },[]);
    const [user,setUser]=React.useState({});
    const [open, setOpen] = React.useState(false);
    const authUser=localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;
    const handleClickOpen = () => {
        if(user.penaltyPoints>=3){
          if(!toast.isActive(8))
            toast.error("You cant make reservation due to penalty points!",{
              toastId:8
            });
          return;  
        }
        setOpen(true);
        
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    return (
    <React.Fragment >
      <Button variant="contained" color='secondary' onClick={handleClickOpen} fullWidth>  
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