import React, { useEffect, useState } from 'react';
import  Button  from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GetContractByCompanyId } from '../../services/ContractService';
import { Box } from '@mui/material';

import LinearProgress from '@mui/material/LinearProgress';
export function TrackingContractComponent({companyId}) {
    const [open,setOpen]=React.useState(false);
    const [contracts,setContracts]=React.useState([]);
    useEffect(() => {
        GetContractByCompanyId(companyId).then((res)=>{
            setContracts(res.data);
            console.log(res.data);
        });

    }, [open]);
    const handleClickClose=()=>{
        setOpen(false);
    }
    const handleClickOpen=()=>{
        setOpen(true);
    }
    const calculateProgress=(day)=>{
        let today=new Date();
        let newDate=new Date();
        newDate.setMonth(newDate.getMonth()+1);
        if (newDate.getMonth() !== (today.getMonth() + 1) % 12) {
            newDate.setDate(0); // Set to the last day of the previous month
        }
        let diff=newDate.getTime()-today.getTime();
        if(today.getDate()>day){
            newDate.setDate(day);
            //console.log(today.toLocaleDateString(),newDate.toLocaleDateString());
        }else{
            newDate=new Date();
            newDate.setDate(day);
            //console.log(today.toLocaleDateString(),newDate.toLocaleDateString());
        }
        console.log(1-(newDate.getTime()-today.getTime())/diff)
        return (1-(newDate.getTime()-today.getTime())/diff)*100;
        //console.log(today.getDate());



        
        //console.log(today.toLocaleDateString(),newDate.toLocaleDateString());

    }

    return (
        <>
            <Button variant="contained" color='secondary' onClick={handleClickOpen} fullWidth sx={{mt:"20px"}}>Track orders</Button>
            {/* <Button variant="contained" color='secondary' onClick={()=>calculateProgress(1)}>debug</Button> */}
            <Dialog open={open} onClose={handleClickClose} maxWidth='lg' fullWidth >
                <DialogTitle>Tracking orders:</DialogTitle>
                <DialogContent>
                    <Box>
                        {contracts.map(contract => (
                            <Box key={contract.username}>
                                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                    <Box sx={{padding:"10px"}}>
                                        <Box><b>Ordered:</b>&nbsp; {contract.username}</Box>
                                        <Box><b>Day for order:</b>&nbsp; {contract.dateTimeInMS}.</Box>
                                    </Box>
                                    <LinearProgress variant="determinate" value={calculateProgress(contract.dateTimeInMS)} color='secondary' sx={{width:"30%",height:"0.8vh"}}/>
                                </Box>
                                <hr></hr>
                                
                                <Box>
                                    <Box sx={{ml:"30px"}}><b>Equipments:</b></Box>
                                    {contract.equipments ? (
                                        contract.equipments.map(equipment => (
                                            
                                            <Box key={equipment.id} sx={{ml:"40px",padding:"10px"}}>
                                                <Box><b>Name:</b>&nbsp; {equipment.name}</Box> 
                                                <Box><b>Description:</b>&nbsp; {equipment.description}</Box>  
                                                <Box><b>Grade:</b>&nbsp; {equipment.grade}</Box>   
                                                
                                            </Box>

                                        ))
                                    ) : (
                                        <Box>No equipments found</Box>
                                        )}  
                                </Box>  
                                <hr></hr>  
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}


export default TrackingContractComponent;