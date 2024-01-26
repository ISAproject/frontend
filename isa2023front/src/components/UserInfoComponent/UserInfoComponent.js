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
        <TextField id="outlined-read-only-input" label="Username" variant="outlined" color="secondary" value={user.username} margin="normal" focused/>
        <TextField id="outlined-read-only-input" label="Name" variant="outlined" color="secondary" value={user.first_name + " " +user.last_name} margin="normal" focused/>
        <TextField id="outlined-read-only-input" label="Address" variant="outlined" color="secondary" value={user.state + ", " +user.city} margin="normal" focused/>
        <TextField id="outlined-read-only-input" label="Phone" variant="outlined" color="secondary" value={user.tel_number} margin="normal" focused/>
        <TextField id="outlined-read-only-input" label="Occupation" variant="outlined" color="secondary" value={user.occupation} margin="normal" focused/>
      </Box>
    );
  }
  
  export default UserInfoComponent;