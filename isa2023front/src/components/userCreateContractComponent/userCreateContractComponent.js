import React, { useEffect, useState } from 'react';
import  Button  from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer } from 'react-toastify';
import { GetEquipmentByCompanyId } from '../../services/EquipmentService';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
function UserCreateContractComponent({companyId}) {
    const [open, setOpen] = React.useState(false);
    const [equipment, setEquipment] = React.useState([]);

    useEffect(() => {
        GetEquipmentByCompanyId(companyId).then((res)=>{
            setEquipment(res.data.filter(item=>item.quantity>=1));
          });
    }, []);

    const handleClickOpen=()=>{
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button variant="contained" color='secondary' onClick={handleClickOpen}>Create contract</Button>
            <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth >
                <DialogTitle>Contract</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Pick quantity:
                </DialogContentText>
                <React.Fragment>
                    <Box sx={{  margin: 'auto', mt: 1, bgcolor: 'background.paper' }} >
                        <TableContainer component={Paper} sx={{ maxWidth: '100%',height:'40vh' }}>
                            <Table>
                                <TableHead>
                                    <TableRow style={{backgroundColor:'#004D40'}}>
                                        <TableCell sx={{color:'white'}}>Equipment name</TableCell>
                                        <TableCell sx={{color:'white'}}>Type</TableCell>
                                        <TableCell sx={{color:'white'}}>Grade</TableCell>
                                        <TableCell sx={{color:'white'}}>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {equipment.map((equipmentItem) => (
                                        <TableRow key={equipmentItem.id}>
                                            <TableCell>{equipmentItem.name}</TableCell>
                                            <TableCell>{equipmentItem.type}</TableCell>
                                            <TableCell>{equipmentItem.grade}</TableCell>
                                            <TableCell>
                                                <TextField
                                                type="number"
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                sx={{width:"4vw"}}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </React.Fragment>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Pick a date!"
                        sx={{ width: '100%' }}/>
                    </DemoContainer>
                </LocalizationProvider>
                <Box sx={{width:"100%",justifyContent:"center",display:"flex"}}>
                    <Button variant="contained" color='secondary' sx={{width:"60%",mt:"2vh"}}>Create</Button>
                </Box>
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
        </>
    );
}

export default UserCreateContractComponent;