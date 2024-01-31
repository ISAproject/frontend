import React,{useState,useEffect} from "react";
import QRCode from "react-qr-code";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { GetAllReservedDates, GetReservedDatesByUserId } from "../../services/ReservedDateService";
import { Button } from "@mui/material";
function UserQrCodeComponent({userId}) {
    useEffect(()=>{
        if(userId==0)return;
        GetReservedDatesByUserId(userId,false).then((res)=>{
            setReservedDates(res.data);
            setReservedDatesAll(res.data);
            
        });
        
      },[userId]);
    const [reservedDates,setReservedDates] = useState([]);
    const [reservedDatesAll,setReservedDatesAll]=useState([]);

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
    const [newClicked,setNewClicked]=useState(false);
    const [acceptedClicked,setAcceptedClicked]=useState(false);
    const [deniedClicked,setDeniedClicked]=useState(false);
    const handleClickNew=()=>{
        setNewClicked(true);
        setAcceptedClicked(false);
        setDeniedClicked(false);
        setReservedDates(reservedDatesAll.filter(item=>item.qrCodeStatus=="NEW"));
    }
    const handleClickAccepted=()=>{
        setNewClicked(false);
        setAcceptedClicked(true);
        setDeniedClicked(false);
        setReservedDates(reservedDatesAll.filter(item=>item.qrCodeStatus=="ACCEPTED"));

    }
    const handleClickDenied=()=>{
        setNewClicked(false);
        setAcceptedClicked(false);
        setDeniedClicked(true);
        setReservedDates(reservedDatesAll.filter(item=>item.qrCodeStatus=="DENIED"));

    }

    return (
        <React.Fragment>
            <Box sx={{display:"flex",justifyContent:"space-evenly",fontSize:"30px",mb:"10px"}}>Filter by status:</Box>
            <Box sx={{display:"flex",justifyContent:"space-evenly"}}>
                <Button variant="contained" color={newClicked==false ? "accent" : "secondary"} onClick={handleClickNew} >New</Button>
                <Button variant="contained" color={acceptedClicked==false ? "accent" : "secondary"} onClick={handleClickAccepted} >Accepted</Button>
                <Button variant="contained" color={deniedClicked==false ? "accent" : "secondary"} onClick={handleClickDenied} >Denied</Button>
            </Box>
            <Box style={{  padding: '16px',overflow: 'auto',height:"400px" }}>
                {reservedDates.map((resDate)=>(
                    <Card  key={resDate.id}  sx={{ minWidth: 275, margin: 2, flex: '1 1 300px', cursor: 'pointer' }}>
                        <CardContent>
                            <Box sx={{display:"flex",flexDirection:"row",padding:"1.5vh"}}>
                                <QRCode size={120}
                                    style={{ height: "auto",  }}
                                    value={resDate.linkToOrder?resDate.linkToOrder:"hehe"}
                                    padding={10}
                                    />
                                <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",fontSize:"2.5vh",ml:"2vw"}}>
                                    <Box>{resDate.companyName}</Box>
                                    <Box>{formatDate(resDate.dateTimeInMS,resDate.duration)}</Box>

                                </Box>     

                            </Box>
                        </CardContent>
                    </Card>
                ))}
                
            </Box>
        </React.Fragment>
    );
  }
  
export default UserQrCodeComponent;

