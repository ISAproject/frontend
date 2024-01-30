import React from "react";
import TextField from "@mui/material/TextField"
import { Box } from "@mui/material";


function UserInfoComponent({user}) {
  
    return (
      <Box
        sx={{ 
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center',
          padding:"20px"

      }}>
        <Box sx={{fontSize:"2.5vh"}}>Profile:</Box>
        <TextField label="Username" variant="outlined" color="secondary" value={user.username} margin="normal" focused/>
        <TextField label="Name" variant="outlined" color="secondary" value={user.first_name + " " +user.last_name} margin="normal" focused/>
        <TextField label="Address" variant="outlined" color="secondary" value={user.state + ", " +user.city} margin="normal" focused/>
        <TextField label="Phone" variant="outlined" color="secondary" value={user.tel_number} margin="normal" focused/>
        <TextField label="Occupation" variant="outlined" color="secondary" value={user.occupation} margin="normal" focused/>
        <TextField label="Penalty points" variant="outlined" color="secondary" value={user.penaltyPoints} margin="normal" focused/>
      </Box>
    );
  }
  
  export default UserInfoComponent;