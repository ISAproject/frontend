import React, { useEffect, useState } from 'react';
import { GetAllCompanies,GetSearchedCompanies } from "../../services/CompanyService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button,TextField,Rating} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

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
      <h1>Companies</h1>
      <Box
        sx={{
          
          display: 'flex',
          justifyContent:'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <TextField 
          id="outlined-basic" 
          label="Search" 
          variant="outlined" 
          color='secondary'
          value={textboxValue}
          onChange={handleTextBoxChange}/>  
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
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : ratingValue]}</Box>
          )}
        </Box>

        <Button variant="contained" onClick={handleSearch} color='secondary'>Search</Button>
      </Box>


      {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
      ))}
    </>
  );
}

export default AllCompaniesComponent;
