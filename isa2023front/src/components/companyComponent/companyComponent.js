import React, { useEffect, useState } from 'react';
import { GetCompanyById, UpdateCompany } from "../../services/CompanyService";
import { useParams } from 'react-router-dom';
import { GetCompanyAdministrators } from '../../services/UserService';
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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function CompanyComponent() {
    const id = useParams().id;

    const [companyData, setCompanyData] = useState({
        id: 0,
        name: "",
        address: "",
        description: "",
        avgGrade: 0,
        equipemntsFree: [],
        administratorsId: []
    });

    const [editMode, setEditMode] = useState(false);
    const [role, setRole] = useState("admin");
    const [selectedAdminId, setSelectedAdminId] = useState();
    const [companyAdministrators, setCompanyAdministrators] = useState([]);
    const [selectedAdmins, setSelectedAdmins] = useState([]);

    useEffect(() => {
        GetCompanyById(id)
            .then((res) => {
                console.log(res);
                setCompanyData(res.data);
                setRole("admin");
            })
            .catch((error) => console.error('Error fetching company data:', error));

        GetCompanyAdministrators()
            .then((res) => {
                setCompanyAdministrators(res.data);
                setSelectedAdminId(res.data[0].id)
            })
            .catch((error) => console.error('Error fetching company administrators data:', error));
    }, [id]);

    const handleEditClick = () => {
        setEditMode(true);
        console.log(companyAdministrators);
    };

    const handleSaveClick = () => {
        UpdateCompany(companyData.id, companyData)
            .then(() => {
                console.log('Company data updated successfully');
                console.log(companyData);
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

    const handleAdminChange = (event) => {
        const selectedAdmins = event.target.value;
        setSelectedAdmins(selectedAdmins);
        companyData.administratorsId = selectedAdmins;
        console.log(companyData.administratorsId)
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Stack spacing={2} direction="column">
                <div>
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
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Administrators</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                label="Administrators"
                                multiple
                                value={selectedAdmins}
                                onChange={handleAdminChange}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((adminId) => {
                                            const admin = companyAdministrators.find((admin) => admin.id === adminId);
                                            return (
                                                <Chip key={adminId} label={`${admin.first_name} ${admin.last_name}`} />
                                            );
                                        })}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {companyAdministrators.map((admin) => (
                                    <MenuItem key={admin.id} value={admin.id}>
                                        <Checkbox checked={selectedAdmins.includes(admin.id)} />
                                        <ListItemText primary={`${admin.first_name} ${admin.last_name}`} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    ) : (<div></div>)}
                </div>
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
