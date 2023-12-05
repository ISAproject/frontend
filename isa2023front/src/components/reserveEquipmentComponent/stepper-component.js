import * as React from 'react';
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

const steps = ['Select equipment', 'Pick a date', 'Confirm'];

export function StepperComponent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const equipment=[{
    id:0,
    name:'hihi',
    type:0,
    grade:3
  },
  {
    id:1,
    name:'hiaaaahi',
    type:0,
    grade:3.4
  }]
  const items = ['Item 1', 'Item 2', 'Item 3'];

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  
  const listStyle = {
    width: '100%',
    bgcolor: 'background.paper',
    overflowY: 'auto',
    maxHeight: '30vh',
    marginTop:'1.5vh'
    
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
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
        <Box sx={{ width: '80vw', margin: 'auto', mt: 5, bgcolor: 'background.paper' }}>
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
    }
    {(activeStep === 1) &&
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Select date"/>
                </DemoContainer>
            </LocalizationProvider>
            
            <List sx={listStyle}>
                {items.map((item, index) => (
                    <ListItem key={index} button>
                        {item}
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
            {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
            </Button>
        )}

        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>    
    </Box>
  );
}

export default StepperComponent;