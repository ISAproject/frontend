import React, { useEffect, useState } from 'react';
import { GetAllCompanies } from "../../services/CompanyService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

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
            <h1 sx={{ textAlign: 'center' }}>Companies</h1>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </Box>
        </>
    );
}

export default AllCompaniesComponent;
