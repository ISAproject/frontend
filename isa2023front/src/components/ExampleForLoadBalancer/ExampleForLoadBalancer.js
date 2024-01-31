import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField"
import { Box } from "@mui/material";
import {LoadExample} from "../../services/UserService";
import Button from "@mui/material/Button";


function ExampleComponent() {
    const [user, setUser] = useState({})
    const [i, setI] = useState(0)
    useEffect(() => {

    }, []);
    const getUser = async() => {
        if(i%5==0 || i%5===1) {
            const user1 = await LoadExample(-30);
            setUser(user1);
            setI(i+1)
        }
        if(i%5==2 || i%5===3 || i%5===4) {
            const user1 = await LoadExample(-2);
            setUser(user1);
            setI(i+1)
        }
        //console.log(user)
    }
    return (
        <>
            {user.data?
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection:'column',
                        alignItems: 'center',
                        padding:"20px"

                    }}>
                    <Box sx={{fontSize:"2.5vh"}}>Profile:</Box>
                    <TextField label="Username" variant="outlined" color="secondary" value={user.data.username} margin="normal" focused/>
                    <TextField label="Name" variant="outlined" color="secondary" value={user.data.first_name + " " +user.data.last_name} margin="normal" focused/>
                    <TextField label="Address" variant="outlined" color="secondary" value={user.data.state + ", " +user.data.city} margin="normal" focused/>
                    <TextField label="Phone" variant="outlined" color="secondary" value={user.data.tel_number} margin="normal" focused/>
                    <TextField label="Occupation" variant="outlined" color="secondary" value={user.data.occupation} margin="normal" focused/>
                    <TextField label="Penalty points" variant="outlined" color="secondary" value={user.data.penaltyPoints} margin="normal" focused/>
                </Box>
                :
                <></>
            }

            <Button variant="contained" sx={{ backgroundColor: "#c5ab85" }} onClick={()=>getUser()}>Get user</Button>
        </>
);
}

export default ExampleComponent;