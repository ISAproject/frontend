import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { GetUserByUsername } from '../../services/UserService';
import authService from '../../services/auth.service';
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

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {SendCoordinates} from '../../services/MapService';

export default function HomePageContainer() {
  function logOut() {
    window.location.href = '/home';
    authService.logout();
  }

  const customIcon = new Icon({
    iconSize: [48, 48],
    iconUrl: require('../../utils/images/placeholder.png'),
  });

  const vanIcon = new Icon({
    iconSize: [48, 48],
    iconUrl: require('../../utils/images/van.png'),
  });

  const coordinates = [
    [45.25167, 19.83694],
    [45.26167, 19.84694],
  ];

  const [user, setUser] = useState({});
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
  }, []);
  const mapRef = useRef(null);
  var controlRef = useRef(null);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (authUser) {
      GetUserByUsername(authUser?.username)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (authUser && mapRef.current && !flag) {
      handleMapCreated(mapRef.current);
      setFlag(true);
    }
  }, [authUser, mapRef]);


  const handleMapCreated = (map) => {
    const control = L.routing.control({
      waypoints: [
        L.latLng(coordinates[0][0], coordinates[0][1]),
        L.latLng(coordinates[1][0], coordinates[1][1]),
      ],
      routeWhileDragging: true,
      router: L.routing.mapbox(
        'pk.eyJ1IjoiYm9zaGtvNDIwIiwiYSI6ImNsbno0Y2xnZDEwenQyaXFtbWhoNGw3djEifQ.QgZuryjcj1pb-hGXF0ueRg',
        { profile: 'mapbox/driving-traffic' }
      ),
      lineOptions: {
        styles: [
          {
            color: '#FF0000',
          },
        ],
      },
      createMarker: function (i, waypoint, n) {
        const markerIcon = customIcon;
        const marker = L.marker(waypoint.latLng, { icon: markerIcon });
        return marker;
      },
    });

    controlRef.current = control;
    control.addTo(map);
  };

  const handleVanStart = () => {
    var marker = L.marker([45.25167, 19.83694], { icon: vanIcon }).addTo(mapRef.current);
    controlRef.current.on('routesfound', function (e) {
      //console.log('Routes Found:', e.routes);
  
      var coordinates = e.routes[0].coordinates;
      let coordinate=[]
      coordinates.forEach((c,index)=>{
        coordinate[index]={lang:c.lng, lat:c.lat}
      })
     //console.log(coordinate)

      coordinates.forEach(function (coord, index) {
        setTimeout(function () {
          SendCoordinates({lang:coord.lng, lat:coord.lat}).then((res)=>{
            marker.setLatLng([res.data.lat, res.data.lang]);
            //console.log([res.data.lat, res.data.lang])
          })

        }, 1000 * index);
      });
    });
  
    controlRef.current.addTo(mapRef.current);
  }


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
      <>
      <Box sx={{ flexGrow: 1 }}>
      
      {authUser ? (
        <Box
        key="mapContainer"
        sx={{
          borderRadius: '100px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ marginTop: '5%', fontWeight: '700', textDecoration: 'underline' }}>
          <LocalShippingIcon sx={{ marginRight: '15px' }} fontSize='large' />
          Your delivery
        </h2>
        <MapContainer
          center={[45.25167, 19.83694]}
          zoom={13}
          id="map"
          ref={mapRef}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <Button
          type="submit"
          variant="contained"
          color='secondary'
          style={{ width: '700px', marginTop: '36px', paddingLeft: '64px', paddingRight: '64px' }}
          onClick={handleVanStart}
        >
          Start delivery
        </Button>
      </Box>
      
      ) : null}
    </Box>
      </>
    </>
    
  );
}
