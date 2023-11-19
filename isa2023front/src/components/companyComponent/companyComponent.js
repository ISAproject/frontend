import React, { useEffect, useState } from 'react';
import { GetCompanyById, UpdateCompany, GetSearchedCompanies, GetAllCompanies } from "../../services/CompanyService";
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GetEquipmentByCompanyId } from '../../services/EquipmentService';
import { Box } from '@mui/material';
import { CreateReservedDate } from '../../services/ReservedDateService';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

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

    const [companies, setCompanies] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [role, setRole] = useState("companyAdmin");
    const [companyAdministrators, setCompanyAdministrators] = useState([]);
    const [selectedAdmins, setSelectedAdmins] = useState([]);
    const [selectedFreeDates, setSelectedFreeDates] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [reservationDate, setReservationDate] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const companyRes = await GetCompanyById(id);
                const equipmentRes = await GetEquipmentByCompanyId(id);

                setCompanyData(companyRes.data);
                setSelectedAdmins(companyRes.data.administratorsId);
                setSelectedFreeDates(companyRes.data.equipemntsFreeMilliseconds);
                setEquipment(equipmentRes.data);
                setRole("companyAdmin");

                const adminRes = await GetCompanyAdministrators();
                const companiesRes = await GetAllCompanies();


                const admins = adminRes.data;

                companiesRes.data.forEach((company) => {
                    company.administratorsId.forEach((admin) => {
                        if (company.id !== companyData.id) {
                            const indx = admins.indexOf(admins.find((a) => a.id === admin));
                            admins.splice(indx, 1);
                        }
                    });
                });
                setCompanyAdministrators(admins);

                console.log(equipment);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, companyData.id]);

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const formatMillisecondsToDate = (milliseconds) => {
        const date = new Date(milliseconds);
        return formatDate(date);
    };

    const handleEditClick = () => {
        setEditMode(true);
        console.log(equipment);
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
    };

    const handleFreeDatesChange = (event) => {
        const selectedFreeDates = event.target.value;
        setSelectedFreeDates(selectedFreeDates);
        companyData.equipemntsFreeMilliseconds = selectedFreeDates;
    };

    const handleDatePickerChange = (date) => {
        var convertedDate = new Date(date)

        selectedFreeDates.push(convertedDate.getTime());
    };

    const handleReservationDateChange = (event) => {
        const selectedDate = event.target.value;
        setReservationDate(selectedDate);
    };
    
    const handleReserveButtonClick = () => {
        if (!reservationDate) {
            alert("You have to pick a date!")
            return;
        }
    
        console.log(reservationDate);
    
        var reservation = {
            id: '',
            dateTimeInMS: reservationDate,
            userId: 1,
            equipments: equipment.map(eq => eq.id)
        };
    
        CreateReservedDate(reservation);
    
        const updatedFreeDates = selectedFreeDates.filter(date => date !== reservationDate);
        setSelectedFreeDates(updatedFreeDates);
        console.log(updatedFreeDates);
    
        // Assuming you also want to update companyData state
        companyData.equipemntsFreeMilliseconds = updatedFreeDates;

        UpdateCompany(id, companyData)
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10vh' }}>
            <Stack spacing={2} direction="column">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90vw' }}>
                    <TableContainer component={Paper} sx={{ maxWidth: '80vw', margin: 'auto' }}>
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
                    <Box sx={{ width: '80vw', margin: 'auto', mt: 5, bgcolor: 'background.paper' }}>
                        <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {equipment.map((equipmentItem) => (
                                        <TableRow key={equipmentItem.id}>
                                            <TableCell>{equipmentItem.name}</TableCell>
                                            <TableCell>{equipmentItem.type}</TableCell>
                                            <TableCell>{equipmentItem.grade}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {role === "user" ? (
                        <div>
                            <FormControl fullWidth sx={{ width: '80vw', mt: 5 }}>
                                <InputLabel id="demo-simple-select-label">Select Date</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Date"
                                    onChange={handleReservationDateChange}
                                >
                                    {companyData.equipemntsFreeMilliseconds.map((date) => (
                                        <MenuItem key={date} value={date}>
                                            {formatMillisecondsToDate(date)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button variant="contained" onClick={handleReserveButtonClick} sx={{ width: '100%', mt: 2 }} color="secondary">
                                    Reserve
                                </Button>
                            </FormControl>
                        </div>
                    ) : (
                        <div></div>
                    )}

                    {editMode ? (
                        <FormControl fullWidth sx={{ maxWidth: '80vw', mt: 5 }}>
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
                                                <Chip key={adminId} label={`${admin?.first_name} ${admin?.last_name}`} />
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

                    {editMode ? (
                        <FormControl fullWidth sx={{ mt: 5, width: '80vw', mb: 5 }}>
                            <Stack spacing={1} direction="row">
                                <InputLabel id="demo-multiple-checkbox-label">Free Dates</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    label="Free Dates"
                                    multiple
                                    value={selectedFreeDates}
                                    onChange={handleFreeDatesChange}
                                    sx={{ width: '100%' }}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map((date) => (
                                                <Chip key={date} label={formatMillisecondsToDate(date)} />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}>
                                    {companyData.equipemntsFreeMilliseconds.map((date) => (
                                        <MenuItem key={date} value={date}>
                                            <Checkbox checked={selectedFreeDates.includes(date)} />
                                            <ListItemText primary={formatMillisecondsToDate(date)} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            label="Add new date"
                                            onChange={handleDatePickerChange}
                                            sx={{ width: '50%' }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Stack>
                        </FormControl>
                    ) : <div></div>}
                </div>
                {role === "companyAdmin" ? (
                    <div style={{ width: '80vw', margin: 'auto' }}>
                        {editMode ? (
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" onClick={handleSaveClick} sx={{ width: '100%', mt: 5 }} color="secondary">
                                    Save
                                </Button>
                                <Button variant="outlined" onClick={handleCancelClick} sx={{ width: '100%', mt: 5 }} color="secondary">
                                    Cancel
                                </Button>
                            </Stack>
                        ) : (
                            <Button variant="contained" onClick={handleEditClick} sx={{ width: '100%', mt: 5 }} color="secondary">
                                Edit
                            </Button>
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
            </Stack>
        </div>
        </>
    );
}

export default CompanyComponent;    
