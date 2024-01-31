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
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function HomePageContainer() {
  function logOut() {
    window.location.href = '/home';
    authService.logout();
  }

  const customIcon = new Icon({
    iconSize: [48, 48],
    iconUrl: require('../../utils/images/placeholder.png'),
  });

  const coordinates = [
    [45.25167, 19.83694],
    [45.26167, 19.84694],
  ];

  const [user, setUser] = useState({});
  const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;
  const mapRef = useRef(null);
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
  }, [authUser]);

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

    control.addTo(map);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton size="large" edge="start" color="accent" aria-label="menu" sx={{ mr: 2 }}>
            <MonitorHeartIcon />
          </IconButton>
          <Typography variant="h6" color="accent" component="div" sx={{ flexGrow: 1 }}>
            <span style={{ fontWeight: 'bold' }}>MediConnect</span>
          </Typography>
          <Button color="accent" component={Link} to="/home">
            Home
          </Button>

          {authUser ? (
            <>
              {user?.role === 'ROLL_COMPANY_ADMIN' ? (
                <Button color="accent" component={Link} to="/companyAdmin">
                  Profile
                </Button>
              ) : (
                <></>
              )}
              <Button color="accent" component={Link} to="/companies">
                Companies
              </Button>
              <Button color="accent" component={Link} onClick={logOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="accent" component={Link} to="/login">
                Login
              </Button>
              <Button color="accent" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
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
        >
          Start delivery
        </Button>
      </Box>
      
      ) : null}
    </Box>
  );
}
