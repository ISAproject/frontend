import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { GetUserByUsername, UpdateCompanyAdmin } from "../../services/UserService";
import authService from "../../services/auth.service";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import TextField from '@mui/material/TextField';
import theme from '../../styles/theme.js';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ReserveEquipmentComponent from '../../components/reserveEquipmentComponent/reserve-equipment-component';
import { GetAllCompanies } from "../../services/CompanyService";
import usersImage from '../../images/users.png';
import equipmentImage from '../../images/equipment.jpg';
import calendarImage from '../../images/calendar.jpg';
import reserveDateImage from '../../images/reserveDate.jpg';
import profileImage from '../../images/profile.jpg';


export default function HomePageContainer() {
  function logOut() {
    window.location.href = '/home';
    authService.logout();
  }

  const [user, setUser] = useState({})
  const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;
  const [companyId, setCompanyId] = useState();

  useEffect(() => {

    GetAllCompanies()
    .then((resComp) => {
      resComp.data.forEach(company => {
        company.administratorId.forEach(id => {
          if(id === user.id)
            console.log(id, user.id, company.id)
            setCompanyId(company.id);
        })
      });
    })
    .catch((error) => {
      console.error('Error fetching companies:', error);
    });

    if (authUser) {
      GetUserByUsername(authUser?.username)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        })
    }
  }, [user.username]);

  return (
    <>
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
              <MonitorHeartIcon />
            </IconButton>
            <Typography variant="h6" color="accent" component="div" sx={{ flexGrow: 1 }}>
              <span style={{ fontWeight: 'bold' }}>MediConnect</span>
            </Typography>
            <Button color="accent" component={Link} to="/home">Home</Button>

            {authUser ?
              <>
                {user?.role === 'ROLL_COMPANY_ADMIN' ?
                  <Button color="accent" component={Link} to="/companyAdmin">Profile</Button>
                  : <></>
                }
                {user?.role === 'ROLL_USER' ?
                                            <Button color="accent" component={Link} to="/user/page">Profile</Button>
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
      {(user.role == "ROLL_COMPANY_ADMIN") ?
        <>
          <div className='d-flex flex-wrap justify-content-center mt-5'>
            <Card sx={{ maxWidth: 345, width: '100%', marginBottom: '10px', marginRight: '10px' }}>
              <CardMedia
                sx={{ height: 210 }}
                image={usersImage}
                title="Green Iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Korisnici
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Spisak svih registrovanih korisnika koji su rezervisali opremu u firmi.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/allUsersWithOrders/${companyId}`} variant="contained" color="secondary">View</Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, width: '100%', marginBottom: '10px' , marginRight: '10px'}}>
              <CardMedia
                sx={{ height: 210 }}
                image={equipmentImage}
                title="Green Iguana"
              >
                <img src="../images/equipment.jpg" />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Oprema
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Unos informacija o preuzimanju opreme.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/ordersInformation/${companyId}`} variant="contained" color="secondary">View</Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, width: '100%', marginBottom: '10px', marginRight: '10px'}}>
              <CardMedia
                sx={{ height: 210 }}
                image={calendarImage}
                title="Green Iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Kalendar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Radni kalendar
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/company-calendar/${companyId}`} variant="contained" color="secondary">View</Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, width: '100%', marginBottom: '10px', marginRight: '10px' }}>
              <CardMedia
                sx={{ height: 210 }}
                image={reserveDateImage}
                title="Green Iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Termini
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zakazivanje novih termina za opremu
                </Typography>
              </CardContent>
              <CardActions>
                <div><ReserveEquipmentComponent companyId={companyId} /></div>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, width: '100%', marginBottom: '10px', marginRight: '10px' }}>
              <CardMedia
                sx={{ height: 210 }}
                image={profileImage}
                title="Green Iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Profil
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Moj profil
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" component={Link} to="/companyAdmin" color="secondary">View</Button>
              </CardActions>
            </Card>
          </div>
        </>
        :
        <></>
      }
    </>
  );
}