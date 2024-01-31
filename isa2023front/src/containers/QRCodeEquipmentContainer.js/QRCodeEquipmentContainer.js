
import React,{useEffect,useState} from 'react';
import { FindEquipmentByReservationDateId } from '../../services/ReservedDateService';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
function QRCodeEquipmentContainer() {
    const { id } = useParams();
    useEffect(()=>{
        FindEquipmentByReservationDateId(id).then((res)=>{
            setEquipment(res.data);
        })
    },[]);

    const [equipment,setEquipment]=React.useState([]);

    return (
        <React.Fragment>
            <h1>This is your order!</h1>
            <Box sx={{  margin: 'auto', mt: 5, bgcolor: 'background.paper' }} >
                <TableContainer component={Paper} sx={{ maxWidth: '100%'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Equipment name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {equipment.map((equipmentItem) => (
                                <TableRow key={equipmentItem.id}>
                                    <TableCell>{equipmentItem.name}</TableCell>
                                    <TableCell>{equipmentItem.type}</TableCell>
                                    <TableCell>{equipmentItem.grade}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    );
  }
  
  export default QRCodeEquipmentContainer;