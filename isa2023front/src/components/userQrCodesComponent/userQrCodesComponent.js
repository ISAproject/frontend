import React,{useState,useEffect} from "react";
import QRCode from "react-qr-code";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { GetReservedDatesByUserId } from "../../services/ReservedDateService";
function UserQrCodeComponent({userId}) {
    useEffect(()=>{
        if(userId==0)return;
        GetReservedDatesByUserId(userId,false).then((res)=>{
            setReservedDates(res.data);
            console.log(res.data)
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

    return (
        <React.Fragment>
            <Box style={{ background: 'white', padding: '16px' }}>
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

