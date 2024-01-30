import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import UserUpdateComponent from "../../components/UserComponent/UserUpdateComponent"
import { GetUserById } from "../../services/UserService";
import React, { useEffect, useState } from 'react';
import { GetUserByUsername } from "../../services/UserService";
import UserReservationsComponent from "../../components/userReservationsComponent/userReservationsComponent";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import authService from "../../services/auth.service";
import UserQrCodeComponent from "../../components/userQrCodesComponent/userQrCodesComponent";

function UserViewContainer() {
  const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;
  let user = {
    username: "",
    first_name: "",
    last_name: "",
    state: "",
    city: "",
    tel_number: "",
    occupation: "",
    company_info: "",
    role: "",
    verified: ""
  }
  function logOut() {
    window.location.href = '/home';
    authService.logout();
  }

  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (authUser) {
      GetUserByUsername(authUser.username).then((res) => {
        setUserData(res.data);
        setUserId(res.data.id);
      });
    }
  }, []);

  const handleUserInfo = () => {
    console.log("works")
    GetUserById(userId).then((res) => setUserData(res.data));
  }

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='secondary'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="accent"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="accent" component="div" sx={{ flexGrow: 1 }}>
              <span style={{ fontWeight: 'bold' }}>MediConnect</span>
            </Typography>
            <Button color="accent" component={Link} to="/home">Home</Button>
            <Button color="accent" component={Link} to="/user/page">Profile</Button>
            {authUser ?
              <>
                {user?.role === 'ROLL_COMPANY_ADMIN' ?
                  <Button color="accent" component={Link} to="/companyAdmin">Profile</Button>
                  : <></>
                }
                <Button color="accent" component={Link} to="/companies">Companies</Button>
                <Button color="accent" component={Link} onClick={logOut}>Logout</Button>
               
              </>
              : <><Button color="accent" component={Link} to="/login">Login</Button>
                <Button color="accent" component={Link} to="/register">Register</Button>
              </>}

          </Toolbar>
        </AppBar>
      </Box>
      {authUser
        ?
        <Box>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100vw",
            padding: "10vh"
          }}>
              <Box>
                <UserInfoComponent user={userData} />
                <UserUpdateComponent userInfoFunction={handleUserInfo} userId={userId} />
              </Box>
              <Box>
              
                <UserReservationsComponent userId={userId} flag={false}/>
              </Box>
              <Box>
                
                <UserReservationsComponent userId={userId} flag={true}/>
              </Box>
          </Box>
          <UserQrCodeComponent userId={userId}/>
        </Box>
        :
        <div>
          <h2>Page not found :/</h2>
        </div>
      }
    </Box>
  );
}

export default UserViewContainer;