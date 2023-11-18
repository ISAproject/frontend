import React, { useEffect, useState } from 'react';
import { GetCompanyById, UpdateCompany } from "../../services/CompanyService";
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function CompanyComponent() {
    const id = useParams().id;

    const [companyData, setCompanyData] = useState({
        id: 0,
        name: "",
        address: "",
        description: "",
        avgGrade: 0,
        equipemntsFree: [],
        administrators: []
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        GetCompanyById(id)
            .then((res) => {
                console.log(res);
                setCompanyData(res.data);
            })
            .catch((error) => console.error('Error fetching company data:', error));
    }, [id]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        UpdateCompany(companyData.id, companyData)
            .then(() => {
                console.log('Company data updated successfully');
                setEditMode(false);
            })
            .catch((error) => console.error('Error updating company data:', error));
    };

    const handleCancelClick = () => {
        setEditMode(false);
    };

    const handleInputChange = (field, value) => {
        setCompanyData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Stack spacing={2} direction="column">
                <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Average Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {editMode ? (
                                    <>
                                        <TableCell>
                                            <TextField
                                                value={companyData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={companyData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={companyData.description}
                                                onChange={(e) => handleInputChange('description', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={companyData.avgGrade}
                                                onChange={(e) => handleInputChange('avgGrade', e.target.value)}
                                            />
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>{companyData.name}</TableCell>
                                        <TableCell>{companyData.address}</TableCell>
                                        <TableCell>{companyData.description}</TableCell>
                                        <TableCell>{companyData.avgGrade}</TableCell>
                                    </>
                                )}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {editMode ? (
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={handleSaveClick}>
                            Save
                        </Button>
                        <Button variant="outlined" onClick={handleCancelClick}>
                            Cancel
                        </Button>
                    </Stack>
                ) : (
                    <Button variant="contained" onClick={handleEditClick}>
                        Edit
                    </Button>
                )}
            </Stack>
        </div>
    );
}

export default CompanyComponent;