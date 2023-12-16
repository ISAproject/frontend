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
import { GetEquipmentByCompanyId } from '../../services/EquipmentService';
import { GetCompanyById } from '../../services/CompanyService';
import { GetPredefinedDates } from '../../services/PredefinedDatesService';


const steps = ['Select equipment', 'Pick a date', 'Confirm'];

export function StepperComponent() {
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(()=>{
    GetEquipmentByCompanyId(-1).then((res)=>{
      setEquipment(res.data);
    });
    GetCompanyById(-1).then((res)=>{
      setCompany(res.data);
      GetPredefinedDates(res.data.predefinedDatesId).then((res)=>{
        let predefDates=res.data.filter(item=>item.dateTimeInMs > new Date().getTime());
        setMainDates(predefDates);
        setDates(predefDates.sort((a, b) => a.dateTimeInMs - b.dateTimeInMs).slice(0, 5));
        console.log(res.data)
      });

    });
  },[]);
  const [mainDates, setMainDates] = React.useState([]);



  const [equipment, setEquipment] = React.useState([]);
  const [company,setCompany]=React.useState({});
  const [dates,setDates]=React.useState([]);

  const [checked, setChecked] = useState([]);

  const addEquipmentClick=(equipmentId) => (event) =>{
    if(checked.includes(equipmentId)){
      setChecked(checked.filter(item => item !== equipmentId));
    }else{
      setChecked([...checked, equipmentId]);
    } 
  }

  const items = ['Item 1', 'Item 2', 'Item 3'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); 
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };
  
  const listStyle = {
    width: '100%',
    bgcolor: 'background.paper',
    overflowY: 'auto',
    maxHeight: '30vh',
    marginTop:'1.5vh',
    
    
  };
  const listItemStyle = (date) => ({
    background: selectedDate.id === date.id ? '#a0a0a0' : 'transparent',
    justifyContent: 'center',
  });
  const handleItemClick = (date) => {
    setSelectedDate(date);
    console.log(date);
  };
  const [selectedDate, setSelectedDate] = useState({id:0});

  const [pickedDate, setPickedDate] = useState(null);
  const handleDatepicker=(date)=>{
    
    setPickedDate(date);
    //console.log(date.toLocaleString());
     // Replace this with your date string
    const dateObject = new Date(date);
    const dateInMs = dateObject.getTime();
    console.log(dateInMs);
    let copyArray = [...mainDates];
    let variable=copyArray.filter(item => item.dateTimeInMs >= dateInMs);
    setDates(variable);
    console.log(mainDates);
    console.log(variable);
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
      {activeStep === 2 &&
        <React.Fragment>
        <Typography sx={{ mt: 10, mb: 1,textAlign: 'center', }}>
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
        <Box sx={{  margin: 'auto', mt: 5, bgcolor: 'background.paper' }}>
            <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Select date" onChange={handleDatepicker} value={pickedDate}/>
                </DemoContainer>
            </LocalizationProvider>
            
            <List sx={listStyle}>
                {dates.map((date, index) => (
                    <ListItem key={date.id} button
                    onClick={() => handleItemClick(date)}
                    style={listItemStyle(date)}>
                        {new Date(date.dateTimeInMs).toLocaleString()} -- {new Date(date.dateTimeInMs+date.duration*60000).toLocaleString()}
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
            >
            Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            

        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>    
    </Box>
  );
}

export default StepperComponent;