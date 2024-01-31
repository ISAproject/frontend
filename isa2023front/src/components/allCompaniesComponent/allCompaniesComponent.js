import React, { useEffect, useState } from 'react';
import { GetAllCompanies, GetSearchedCompanies } from "../../services/CompanyService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button, TextField, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './allCompaniesComponent.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import authService from "../../services/auth.service";
import { GetUserByUsername } from '../../services/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function CompanyCard({ company }) {
  const companyDetailsLink = `/company/${company.id}`;

  return (
    <Link to={companyDetailsLink} style={{ textDecoration: 'none' }}>
      <Card variant="outlined" sx={{ minWidth: 275, margin: 2, flex: '1 1 300px', cursor: 'pointer' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {company.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {company.address}
          </Typography>
          <Typography variant="body2">
            Average Grade: {company.avgGrade}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

function AllCompaniesComponent() {
  const [companies, setCompanies] = useState([]);
  const [textboxValue, setTextboxValue] = useState('');
  const [ratingValue, setRatingValue] = useState(0);
  const [hover, setHover] = React.useState(-1);

  const [user, setUser] = useState({})
  const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

  function logOut() {
    window.location.href = '/home';
    authService.logout();
  }


  useEffect(() => {
    
    GetAllCompanies()
    .then((resComp) => {
      setCompanies(resComp.data);
      
    })
    .catch((error) => {
      console.error('Error fetching companies:', error);
    });

    if(authUser){
    GetUserByUsername(authUser.username)
      .then((res) => {
        setUser(res.data);


      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      })
    }
  }, []);


  const handleTextBoxChange = (event) => {
    setTextboxValue(event.target.value);
  };
  const handleSearch = () => {
    GetSearchedCompanies(textboxValue, ratingValue)
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((error) => console.error('Error fetching company data:', error));
    if (!authUser)
      return;
    GetUserByUsername(authUser?.username)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const [flagRating,setFlagRating]=useState(true);
  const [ratingClicked,setRatingClicked]=useState(false);
  const handleRatingSort=()=>{
    setStateClicked(false);
    setNameClicked(false);
    setRatingClicked(true);
    let newCompanies;
    if(flagRating){
      newCompanies=[...companies].sort((a, b) => a.avgGrade - b.avgGrade);
      setFlagRating(false);
    }
    else{
      newCompanies=[...companies].sort((a, b) => b.avgGrade - a.avgGrade);
      setFlagRating(true);
    }
    setFlagName(true);
    setFlagState(true);

    setCompanies(newCompanies);
  }

  const [flagName,setFlagName]=useState(true);
  const [nameClicked,setNameClicked]=useState(false);
  const handleNameSort=()=>{
    setStateClicked(false);
    setNameClicked(true);
    setRatingClicked(false);

    let newCompanies;
    if(flagName){
      newCompanies=[...companies].sort((a, b) => a.name.localeCompare(b.name));
      setFlagName(false);
    }
    else{
      newCompanies=[...companies].sort((a, b) => b.name.localeCompare(a.name));
      setFlagName(true);
    }
    setFlagRating(true);
    setFlagState(true);

    setCompanies(newCompanies);
  }
  const [flagState,setFlagState]=useState(true);
  const [stateClicked,setStateClicked]=useState(false);
  const handleStateSort=()=>{
    setStateClicked(true);
    setNameClicked(false);
    setRatingClicked(false);
    let newCompanies;
    if(flagState){
      newCompanies=[...companies].sort((a, b) => a.address.localeCompare(b.address));
      setFlagState(false);
    }
    else{
      newCompanies=[...companies].sort((a, b) => b.address.localeCompare(a.address));
      setFlagState(true);
    }
    setFlagRating(true);
    setFlagName(true);

    setCompanies(newCompanies);
  }
  

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

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
              <MenuIcon />
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
      <h1>Companies</h1>
      <Box
        borderRadius={10}  // Set the border radius
        padding={5}
        sx={{
          background: 'radial-gradient(ellipse 75% 200px at center,#e5f3d0 40%, transparent 70%)',
          marginLeft: '60px',
          marginRight: '60px',
        }}>
        <Box
          sx={{

            display: 'flex',
            flexDirection: 'column',
            marginLeft: '100px',
            marginRight: '100px',

          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginBottom: '10px'
            }}>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              color='secondary'
              value={textboxValue}
              onChange={handleTextBoxChange}
              fullWidth
              margin='normal'
              focused />
            <label className='labelClass'>Rating: </label>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              width: '200px',
              margin: 'normal',
              justifyContent: 'space-between'
            }}>

              <Rating
                name="hover-feedback"
                value={ratingValue}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                size='large'
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />

              {ratingValue !== null && (
                <Box sx={{ ml: 2, color: 'secondary' }}>{labels[hover !== -1 ? hover : ratingValue]}</Box>
              )}
            </Box>
          </Box>

          <Button variant="contained" onClick={handleSearch} color='secondary'>Search</Button>
          
        </Box>
        
      </Box>
      
      <Box sx={{display:'flex',justifyContent:'space-evenly'}}>
        <Button onClick={handleRatingSort}  color={ratingClicked ?"secondary" : "accent"} variant='contained' sx={{width:'16vw'}}>Rating&nbsp; {flagRating?<FontAwesomeIcon icon={faArrowUp} />:<FontAwesomeIcon icon={faArrowDown} />}</Button>
        <Button onClick={handleNameSort} color={nameClicked ? "secondary" : "accent"} variant='contained' sx={{width:'16vw'}}>Name&nbsp;{flagName?<FontAwesomeIcon icon={faArrowUp} />:<FontAwesomeIcon icon={faArrowDown} />}</Button>
        <Button onClick={handleStateSort}  color={stateClicked ? "secondary" : "accent"} variant='contained' sx={{width:'16vw'}}>Address&nbsp;{flagState?<FontAwesomeIcon icon={faArrowUp} />:<FontAwesomeIcon icon={faArrowDown} />}</Button>
      </Box>
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}

    </>
  );
}

export default AllCompaniesComponent;
