import React,{useState,useEffect} from "react";
import { Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetReservedDatesByUserId,DeleteReservedDate } from "../../services/ReservedDateService";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import {GetAllPredefinedDates} from "../../services/PredefinedDateService";
import {UpdatePredefineDate} from "../../services/PredefinedDatesService";
function UserReservationsComponent({userId,flag}) {
    useEffect(()=>{
        if(userId==0)return;
        GetReservedDatesByUserId(userId,flag).then((res)=>{
            setReservedDates(res.data);
            
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
        
    
        const datePart=`${padZero(month)}/${padZero(day)}/${year}`;
        return datePart+ ' ' + timePart + ' - ' +endTimePart ;
      }
    
    const handleCancel=(date)=>{
        if(new Date().getTime()+24*60*60*1000>=date.dateTimeInMS){
            toast.error("You cant cancel reservetion 24 hours before it starts!");
            return;
        }
        // console.log(GetAllPredefinedDates());
        // console.log(date);
        
        DeleteReservedDate(date.id).then(()=>{
            setReservedDates([...reservedDates].filter(item=>item.id!=date.id));
            if(date.companyAdminId!=0){
                GetAllPredefinedDates().then((res)=>{
                    let object=res.data.filter(item=>item.companyAdminId==date.companyAdminId && item.dateTimeInMs==date.dateTimeInMS && item.duration==date.duration)[0];
                    object.free=true;
                    UpdatePredefineDate(object).then(()=>{
                        console.log('works');
                        toast.success("Your reservation has been deleted!");
                    });
                });
            }else{
                toast.success("Your reservation has been deleted!");
            }
            
        });
    } 
    
    const [dateClicked,setDateClicked] = useState(false);
    const [durationClicked,setDurationClicked] = useState(false);

    const [dateFlag,setDateFlag] = useState(false);
    const [durationFlag,setDurationFlag] = useState(false);

    const handleSortByDate=()=>{
        setDateClicked(true);
        setDurationClicked(false);
        if(dateFlag){
            setDateFlag(false);
            setReservedDates([...reservedDates].sort((a,b)=>a.dateTimeInMS-b.dateTimeInMS));
        }else{
            setDateFlag(true);
            setReservedDates([...reservedDates].sort((a,b)=>b.dateTimeInMS-a.dateTimeInMS));
        }
        

    }
    const handleSortByDuration=()=>{
        
        setDateClicked(false);
        setDurationClicked(true);
        if(durationFlag){
            setDurationFlag(false);
            setReservedDates([...reservedDates].sort((a,b)=>a.duration-b.duration));
        }else{
            setDurationFlag(true);
            setReservedDates([...reservedDates].sort((a,b)=>b.duration-a.duration));
        }
    }
    
    return (
        <React.Fragment>
        <Box sx={{  margin: 'auto', mt: 5, bgcolor: 'background.paper' }} >
            <Box sx={{display:"flex",justifyContent:"space-evenly",mb:"4px"}}>
                <Button color={dateClicked==false ? "accent" : "secondary"} variant='contained' sx={{width:'5vw'}} onClick={handleSortByDate}>Date</Button>
                <Button color={durationClicked==false ? "accent" : "secondary"} variant='contained' sx={{width:'5vw'}} onClick={handleSortByDuration}>Duration</Button>
            </Box>
            <TableContainer component={Paper} sx={{ maxWidth: '100%',minHeight:'40vh' }}>
                <Table>
                    <TableHead>
                        <TableRow style={{backgroundColor:'#004D40'}}>
                            <TableCell sx={{color:'white'}}>Company name</TableCell>
                            <TableCell sx={{color:'white'}}>Date/Time</TableCell>
                            {flag?null:<TableCell></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {reservedDates.map((date) => (
                            <TableRow key={date.id}>
                                <TableCell>{date.companyName}</TableCell>
                                <TableCell>{formatDate(date.dateTimeInMS,date.duration)}</TableCell>
                                {flag?null:<TableCell>
                                    <Button color="secondary" onClick={()=>handleCancel(date)}>Cancel</Button>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
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
  
  export default UserReservationsComponent;