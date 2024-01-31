import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { GetEquipmentByCompanyId, LowerQuantityOfEquipment } from '../../services/EquipmentService';
import { GetCompanyById } from '../../services/CompanyService';
import { GetPredefinedDates } from '../../services/PredefinedDatesService';
import { CreateReservedDateForMail,SendMailReservation } from '../../services/ReservedDateService';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';
import { GetUserByUsername } from '../../services/UserService';
import './reserve-equipment-component.css';
import { UpdatePredefineDate } from '../../services/PredefinedDatesService';
import { GetAllReservedDates } from '../../services/ReservedDateService'; 


const steps = ['Select equipment', 'Pick a date', 'Pick date (optional)','Confirm'];

export function StepperComponent({handleClose,companyId}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [userId,setUserId]=useState(0);
  const [email,setEmail]=useState("");
  const [company,setCompany]=useState({});
  const [time,setTime]=useState(1);
  const authUser=localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;
  useEffect(()=>{
    GetUserByUsername(authUser.username).then((res)=>{
      setUserId(res.data.id);
      setEmail(res.data.email);
    });

    GetEquipmentByCompanyId(companyId).then((res)=>{
      setEquipment(res.data.filter(item=>item.quantity>=1));
    });
    GetCompanyById(companyId).then((res)=>{
      setCompany(res.data);
      GetPredefinedDates(res.data.predefinedDatesId).then((result)=>{
        console.log(result.data);
        const predefDates=result.data.filter(item=>item.dateTimeInMs >= new Date().getTime() && item.free===true);
        setMainDates(predefDates);
        setDates(predefDates.sort((a, b) => a.dateTimeInMs - b.dateTimeInMs).slice(0, 5));
      });

    });
    //console.log(companyId)
    GetAllReservedDates().then((res)=>{
      console.log(res.data)
      setReservedDates(res.data.filter(item=>item.companyId==companyId && item.dateTimeInMS >= new Date().getTime()));
    });
        
  },[authUser.username,userId]);

  const [reseredDates, setReservedDates] = React.useState([]);
  const [mainDates, setMainDates] = React.useState([]);
  const [equipment, setEquipment] = React.useState([]);
  const [dates,setDates]=React.useState([]);
  const [otherDates,setOtherDates]=React.useState([]);
  const [checked, setChecked] = useState([]);

  const addEquipmentClick=(equipmentId) => (event) =>{
    if(checked.includes(equipmentId)){
      setChecked(checked.filter(item => item !== equipmentId));
    }else{
      setChecked([...checked, equipmentId]);
    } 
  }

  const validateDate=(reservedDate)=>{
    if(reservedDate.duration<=0 || reservedDate.equipments.length===0 || reservedDate.dateTimeInMS>=new Date().getTime()){
      return true;
    }
    return false;
  }
const handleOtherDates=()=>{
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
}


  const handleNext = () => {
    //console.log(reseredDates)
    if(checked.length===0){
      toast.error("Please select equipment you want to use!");
      return;
    }
    if(activeStep===1 && Object.keys(selectedDate).length === 0){
      toast.error("Please select a date!");
      return;
    }
    if(activeStep===1){
      setActiveStep((prevActiveStep) => prevActiveStep + 2);
      return;
    }
    
    if(activeStep===steps.length - 1){
      if(Object.keys(selectedOtherDate).length != 0){
        let reservedDate={
          duration: selectedOtherDate.duration,
          equipments: checked,
          companyAdminId: selectedOtherDate.companyAdminId,
          dateTimeInMS: selectedOtherDate.dateTimeInMS,
          userId: userId,
          pickedUp: false,
          companyId: company.id,
          qrCodeStatus:0

        }
        console.log(reservedDate)
        if(validateDate(reservedDate)){
          console.log('works');
          CreateReservedDateForMail(reservedDate,email).then((res)=>{
            if(res.data==null){
              toast.error("There was an error while trying to make reservation!");
              return;
            }
            reservedDate.id=res.data.id;
            SendMailReservation(reservedDate,email);
            checked.forEach(equipmentId => {
              LowerQuantityOfEquipment(equipmentId);
            });
    
            toast.success("Your reservation has been added!");
            
          });
          handleClose();
          
        }else{
          toast.error("Please select a date!");
        }
      }else{
      let reservedDate={
        duration: selectedDate.duration,
        equipments: checked,
        companyAdminId: selectedDate.companyAdminId,
        dateTimeInMS: selectedDate.dateTimeInMs,
        userId: -9,
        pickedUp: false,
        companyId: company.id,
        qrCodeStatus:0
      }
      if(validateDate(reservedDate)){
        CreateReservedDateForMail(reservedDate,email).then((res)=>{
          if(res.data==null){
            toast.error("There was an error while trying to make reservation!");
            return;
          }
          reservedDate.id=res.data.id;
          SendMailReservation(reservedDate,email);
          
          const updateDate={ ...selectedDate, free: false };
          UpdatePredefineDate(updateDate);
  
          checked.forEach(equipmentId => {
            LowerQuantityOfEquipment(equipmentId);
          });
  
          toast.success("Your reservation has been added!");
          
        });
        handleClose();
        
      }else{
        toast.error("Please select a date!");
      }
    }
      
    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1); 
    }
  };

  const handleBack = () => {
    if(activeStep===3){
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
  };


  const handleReset = () => {
    setActiveStep(0);
    setChecked([]);
    setSelectedDate({});
    
  };
  
  const listStyle = {
    width: '100%',
    bgcolor: 'background.paper',
    overflowY: 'auto',
    maxHeight: '30vh',
    marginTop:'1.5vh',
  };
  const listItemStyle = (date) => ({
    background: selectedDate.id === date.id ? '#2196F3' : 'transparent',
    justifyContent: 'center',
    height:'5vh',
  });
  const listItemOtherStyle = (date) => ({
    background: selectedOtherDate.dateTimeInMS == date.dateTimeInMS ? '#2196F3' : 'transparent',
    justifyContent: 'center',
    height:'5vh',
  });
  const handleItemOtherClick=(date)=>{
    setSelectedOtherDate(date);
    console.log(date);
  }
  const handleItemClick = (date) => {
    setSelectedDate(date);
    console.log(date);
  };
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedOtherDate, setSelectedOtherDate] = useState({});
  const [pickedDate, setPickedDate] = useState(null);
  const [pickedOtherDate, setPickedOtherDate] = useState(null);

  const handleDatepickerOtherDates=(date)=>{
    setPickedOtherDate(date);
  }

  const handleDatepicker=(date)=>{
    setSelectedDate({});
    setPickedDate(date);
    const dateObject = new Date(date);
    const dateInMs = dateObject.getTime();
    
    let copyArray = [...mainDates];
    let variable=copyArray.filter(item => item.dateTimeInMs >= dateInMs);
    setDates(variable);
    
  }
  const handleSearch=()=>{
    //console.log(new Date(pickedOtherDate).getTime(),time)
    setOtherDates([]);
    
    const selectedDate=new Date(pickedOtherDate).getTime();
    console.log(new Date().getTime(),selectedDate)
    if(selectedDate<=new Date().getTime()){
      if(!toast.isActive(7))
        toast.warning("Please select a future date",{
          toastId:7
        });
      return;  
    }
    let i=selectedDate;
    let j=0;
    while(true){
      let reservedDate={
        userId: userId,
        id: 0,
        duration: time,
        dateTimeInMS: i,
        equipments: checked,
        pickedUp: false,
        companyId: companyId,
        companyAdminId: 0
      }
      let flag=true;
      for (const element of reseredDates) {
        if((element.dateTimeInMS <= i+time*60*1000 && element.dateTimeInMS+element.duration*60000 >= i) ||
         (i <= element.dateTimeInMS+element.duration*60000 && i+time*60*1000 >= element.dateTimeInMS)){
            flag=false;
            break;
         }
      }
      if(flag){
        setOtherDates(prevDates => [...prevDates, reservedDate]);
        j++;
        if(j==24)break;
      }


      i+=60*60*1000;

    }
    console.log(reseredDates);

  }
  

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
  const handleDuration=(event)=>{
    setTime(event.target.value);
  }
  
  return (

    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
        
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 3 &&
        <React.Fragment>
        <Typography sx={{ mt: 10, mb: 1,textAlign: 'center' }}>
            All steps completed - you&apos;re finished 
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      }
      {(activeStep === 0) &&
        <React.Fragment>
        <Box sx={{  margin: 'auto', mt: 5, bgcolor: 'background.paper' }} >
            <TableContainer component={Paper} sx={{ maxWidth: '100%',height:'40vh' }}>
                <Table>
                    <TableHead style={{backgroundColor:'#2196f3'}}>
                        <TableRow>
                            <TableCell sx={{color:'white'}}>Equipment name</TableCell>
                            <TableCell sx={{color:'white'}}>Type</TableCell>
                            <TableCell sx={{color:'white'}}>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {equipment.map((equipmentItem) => (
                            <TableRow key={equipmentItem.id} 
                              onClick={addEquipmentClick(equipmentItem.id)}
                              selected={checked.includes(equipmentItem.id)}
                              hover
                            >
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
    }
    {(activeStep === 1) &&
        <React.Fragment>
          <Box style={{height:'43vh', marginTop:'3vh'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Pick a date if none of the above are suiting!"
                    onChange={handleDatepicker} 
                    value={pickedDate} 
                    sx={{ width: '100%' }}/>
                </DemoContainer>
            </LocalizationProvider>
            {dates.length<=0?<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',alignContent:'center',height:'80%',fontSize:'30px'}}>No predefined dates! Please select other dates.</Box>:
            <List sx={listStyle}>
                {dates.map((date, index) => (
                    <ListItem key={date.id} button 
                    onClick={() => handleItemClick(date)}
                    style={listItemStyle(date)}>
                        {formatDate(date.dateTimeInMs,date.duration)}
                    </ListItem>
                    
                ))}
            </List>}
          </Box>  
        </React.Fragment>
    }
    {activeStep === 2 &&
        <React.Fragment>
          <Box sx={{ mt: 10, mb: 1,flexDirection:'row',display: 'flex' ,justifyContent:'space-evenly',alignItems:'center',width:'100%'}}>
          
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Pick a date"
                    onChange={handleDatepickerOtherDates} 
                    value={pickedOtherDate}
                    sx={{ width: '30vw' }}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <TextField  color='primary'  label="Duration" variant="outlined" onChange={handleDuration} value={time}/>
            <Button onClick={handleSearch} variant='contained'>
             Search
            </Button>
          </Box>
          <List sx={listStyle}>
                {otherDates.map((date, index) => (
                    <ListItem key={date.dateTimeInMS} button 
                    onClick={() => handleItemOtherClick(date)}
                    style={listItemOtherStyle(date)}>
                        {formatDate(date.dateTimeInMS,date.duration)}
                    </ListItem>
                    
                ))}
            </List>
        </React.Fragment>
      }
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            variant='contained'
            >
            Back
            </Button>
            
            <Box sx={{ flex: '1 1 auto' }} />
            
            {activeStep === 1 ? (
              <Button variant='contained' color='primary' onClick={handleOtherDates} sx={{mr:"20px"}}>
                Find other dates
              </Button>
            ) : null} 

        <Button variant='contained' color='primary' onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
        
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
    </Box>
  );
}

export default StepperComponent;