import React, { useEffect, useState } from 'react';
import { GetAllCompanies,GetSearchedCompanies } from "../../services/CompanyService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button,TextField,Rating} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './allCompaniesComponent.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
  const [textboxValue,setTextboxValue]=useState('');
  const [ratingValue,setRatingValue]=useState(0);
  const [hover, setHover] = React.useState(-1);

  useEffect(() => {
    GetAllCompanies()
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((error) => console.error('Error fetching company data:', error));
  }, []);

  const handleTextBoxChange = (event) => {
    setTextboxValue(event.target.value);
  };
  const handleSearch=()=>{
    GetSearchedCompanies(textboxValue,ratingValue)
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((error) => console.error('Error fetching company data:', error));
    
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
          <Button color="accent">Login</Button>
          <Button color="accent">Register</Button>
        </Toolbar>
      </AppBar>
      <h1>Companies</h1>
      <Box 
        borderRadius={10}  // Set the border radius
        padding={5} 
        sx={{
          background: 'radial-gradient(ellipse 75% 200px at center,#e5f3d0 40%, transparent 70%)',
          marginLeft:'60px',
          marginRight:'60px',
      }}>
      <Box
        sx={{
          
          display: 'flex',
          flexDirection:'column',
          marginLeft:'100px',
          marginRight:'100px',
          
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            flexDirection:'column',
            marginBottom:'10px'
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
            focused/>  
          <label className='labelClass'>Rating: </label>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection:'row',
            width:'200px',
            margin:'normal',
            justifyContent:'space-between'
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
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"/>}
          />
          
            {ratingValue !== null && (
              <Box sx={{ ml: 2,color:'secondary' }}>{labels[hover !== -1 ? hover : ratingValue]}</Box>
            )}
          </Box>  
        </Box> 

        <Button variant="contained" onClick={handleSearch} color='secondary'>Search</Button>
      </Box>
      </Box>         

      {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
      ))}
      
    </>
  );
}

export default AllCompaniesComponent;
