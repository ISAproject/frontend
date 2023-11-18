import React, { useEffect, useState } from 'react';
import { GetAllCompanies } from "../../services/CompanyService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CompanyCard({ company }) {
  return (
    <Card variant="outlined" sx={{ minWidth: 275, marginBottom: 2, flex: '1 1 300px' }}>
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
  );
}

function AllCompaniesComponent() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    console.log('Fetching company data...');
    GetAllCompanies()
      .then((res) => {
        console.log(res);
        setCompanies(res.data);
      })
      .catch((error) => console.error('Error fetching company data:', error));
  }, []);

  return (
    <>
      <h1>Companies</h1>
        {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
        ))}
    </>
  );
}

export default AllCompaniesComponent;
