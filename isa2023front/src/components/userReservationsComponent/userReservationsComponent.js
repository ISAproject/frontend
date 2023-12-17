import React,{useState,useEffect} from "react";
import { Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetReservedDatesByUserId } from "../../services/ReservedDateService";
import { GetCompanyById } from "../../services/CompanyService";

function UserReservationsComponent({userId}) {
    useEffect(()=>{
        if(userId==0)return;
        GetReservedDatesByUserId(userId).then((res)=>{
            setReservedDates(res.data);
            //GetCompanyById(res.data.companyId).then((res)=>{});
        });
        
      },[userId]);
    const [reservedDates,setReservedDates] = useState([]);


    const formatDate=(milliseconds,duration)=>{
        const date=new Date(milliseconds);
        const endDate=new Date(milliseconds+duration*60000);
        
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const endHours=endDate.getHours();
        const endMinutes=endDate.getMinutes();
    
        const padZero = (value) => (value < 10 ? `0${value}` : value);
        const timePart = `${padZero(hours)}:${padZero(minutes)}`;
        const endTimePart=`${padZero(endHours)}:${padZero(endMinutes)}`;
        
        const month=date.getMonth()+1;
        const day=date.getDate();
        const year=date.getFullYear();
        console.log(month);
    
        const datePart=`${padZero(month)}/${padZero(day)}/${year}`;
        return datePart+ ' ' + timePart + ' - ' +endTimePart ;
      }
    return (
        <React.Fragment>
        <Box sx={{  margin: 'auto', mt: 5, bgcolor: 'background.paper' }} >
            <TableContainer component={Paper} sx={{ maxWidth: '100%',height:'40vh' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>CompanyId</TableCell>
                            <TableCell>Date/Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {reservedDates.map((date) => (
                            <TableRow key={date.id}>
                                <TableCell>1</TableCell>
                                <TableCell>{formatDate(date.dateTimeInMS,date.duration)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </React.Fragment>
    );
  }
  
  export default UserReservationsComponent;