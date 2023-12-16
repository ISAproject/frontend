import React, { useEffect, useState } from 'react';
import { GetCompanyById, UpdateCompany, GetSearchedCompanies, GetAllCompanies } from "../../services/CompanyService";
import { useParams } from 'react-router-dom';
import { GetCompanyAdministratorsByCompanyId } from '../../services/UserService';
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
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GetEquipmentByCompanyId } from '../../services/EquipmentService';
import { Box } from '@mui/material';
import { CreateReservedDate, GetAllReservedDates } from '../../services/ReservedDateService';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Grid from '@mui/material/Grid';
import * as styles from './company-component.css';
import { GetAllPredefinedDates, CreatePredefinedDate, DeletePredefinedDate } from '../../services/PredefinedDateService';
import DeleteIcon from '@mui/icons-material/Delete';
import EquipmentSearchComponent from '../equipmentSearchComponent/equipmentSearchComponent';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { CreateEquipment, UpdateEquipment, DeleteEquipment } from '../../services/EquipmentService';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

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
    const roleFromURL = useParams().role;

    const [companyData, setCompanyData] = useState({
        id: 0,
        name: "",
        address: "",
        description: "",
        avgGrade: 0,
        predefinedDatesId: [],
        administratorId: []
    });

    const [editMode, setEditMode] = useState(false);
    const [role, setRole] = useState("companyAdmin");
    const [companyAdministrators, setCompanyAdministrators] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [date, setDate] = useState(null);

    const [predefinedDates, setPredefinedDates] = useState([])
    const [predefinedDatesFromBase, setPredefinedDatesFromBase] = useState([])
    const [duration, setDuration] = useState('');
    const [time, setTime] = useState();
    const [datesToDelete, setDatesToDelete] = useState([])
    const [newEquipment, setNewEquipment] = useState({
        name: '',
        type: 0,
        grade: '',
        companyId: id,
        description: '',
        quantity: 0
    })

    const [editEquipment, setEditEquipment] = useState({
        id: '',
        name: '',
        type: 0,
        grade: '',
        companyId: id,
        description: '',
        quantity: 0
    })

    const [equipmentIdEdit, setEquipmentIdEdit] = useState(0)
    const [existingReservedDates, setExistingReservedDates] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const companyRes = await GetCompanyById(id);
                const equipmentRes = await GetEquipmentByCompanyId(id);
                const companyAdminsRes = await GetCompanyAdministratorsByCompanyId(id);
                const predefinedDatesRes = await GetAllPredefinedDates();
                const existingReservedDatesRes = await GetAllReservedDates();

                setCompanyData(companyRes.data);
                setEquipment(equipmentRes.data);
                setCompanyAdministrators(companyAdminsRes.data);
                setExistingReservedDates(existingReservedDatesRes.data);

                console.log(existingReservedDates)

                const filteredData = predefinedDatesRes.data.filter(d => companyRes.data.administratorId.filter(id => id == d.companyAdminId).length > 0)

                setPredefinedDates(filteredData);
                setPredefinedDatesFromBase(filteredData);

                if (roleFromURL == 2)
                    setRole("companyAdmin");
                else
                    setRole("user");

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

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }


    const formatMillisecondsToDate = (milliseconds) => {
        const date = new Date(milliseconds);
        return formatDate(date);
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            if (companyData.avgGrade < 1 || companyData.avgGrade > 5) {
                alert("Average grade has to be between 1 and 5!");
                return;
            }

            for (const predefinedDate of predefinedDates) {
                if (!predefinedDatesFromBase.find(date => date.id === predefinedDate.id)) {
                    await CreatePredefinedDate(predefinedDate, id);
                }
            }


            await UpdateCompany(companyData.id, companyData);
            setEditMode(false);

            for (const predefDateId of datesToDelete) {
                if (predefinedDatesFromBase.find(date => date.id === predefDateId))
                    await DeletePredefinedDate(predefDateId, id);
            }

            window.location.reload();

        } catch (error) {
            console.error('Error updating company data or processing predefined dates:', error);
        }
    };

    const handleCancelClick = () => {
        setEditMode(false);

        window.location.reload();
    };

    const handleInputChange = (field, value) => {
        setCompanyData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleEquipmentInputChange = (field, value) => {
        setNewEquipment((prevData) => ({
            ...prevData,
            [field]: value,
        }))
    }

    const handleAdminChange = (event) => {
        const selectedAdmin = event.target.value;
        setSelectedAdmin(selectedAdmin);
        companyData.administratorsId = selectedAdmin;
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    }
    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };

    const handleDelete = (id) => {
        const updatedPredefinedDates = predefinedDates.filter(
            (date) => date.id !== id
        );
        setPredefinedDates(updatedPredefinedDates);

        setDatesToDelete([...datesToDelete, id]);
    }

    const handleAddClick = () => {
        if (new Date(date).getTime() < new Date().getTime()) {
            alert("You can't pick date before todays");
            return;
        }

        if (time == null || time.split(':').length == 1) {
            alert("You have to enter staring time in format 08:00!");
            return;
        }

        const newPredefinedDate = {
            id: Math.random(),
            companyAdminId: selectedAdmin,
            dateTimeInMs: new Date(date).getTime() + time.split(':')[0] * 3600000,
            duration: duration
        }

        if (newPredefinedDate.companyAdminId == null || newPredefinedDate.dateTimeInMs == null || newPredefinedDate.duration == '' || newPredefinedDate.duration == null) {
            alert("You have to pick company admin, date and duration to create predefined dates")
            return;
        }
        if (predefinedDates.filter(d => d.companyAdminId == newPredefinedDate.companyAdminId
            && d.dateTimeInMs == newPredefinedDate.dateTimeInMs).length == 0)
            setPredefinedDates([...predefinedDates, newPredefinedDate]);
        else {
            alert("Company admin is already asigned on this date")
        }
    }

    const handleAddEquipmentClick = () => {
        setEquipment([...equipment, newEquipment])
        CreateEquipment(newEquipment);

        setNewEquipment({
            name: '',
            type: 0,
            grade: '',
            companyId: id,
            description: '',
            quantity: 0
        })
    }

    const handleEditEquipmentClick = (equipmentEdit) => {
        setEquipmentIdEdit(equipmentEdit.id)
        setEditEquipment(equipmentEdit)
    }

    const handleCancelEquipmentClick = () => {
        setEquipmentIdEdit(0)
    }

    const handleEditEquipmentInputChange = (field, value) => {
        setEditEquipment((prevData) => {
            const updatedData = {
                ...prevData,
                [field]: value,
            };
            return updatedData;
        });
    }

    const handleUpdateEquipmentClick = () => {
        const updatedEquipment = equipment.map(e => {
            if (e.id === editEquipment.id) {
                return editEquipment;
            }
            return e;
        });

        setEquipment(updatedEquipment);
        setEquipmentIdEdit(0);
        UpdateEquipment(editEquipment.id, editEquipment);
    }

    const handleRemoveEquipmentClick = (id) => {
        const filteredEquipment = equipment.filter(e => e.id != id);

        setEquipment(filteredEquipment);
        DeleteEquipment(id);
    }

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
                        {/* <EquipmentSearchComponent/> */}
                        <Box sx={{ width: '80vw', margin: 'auto', mt: 5, bgcolor: 'background.paper' }}>
                            <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Equipment name</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Grade</TableCell>
                                            {editMode ? (
                                                <>
                                                    <TableCell>Description</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                </>
                                            ) : (<></>)}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {equipment.map((equipmentItem) => (
                                            <TableRow key={equipmentItem.id}>
                                                {equipmentItem.id === equipmentIdEdit ? (
                                                    <>
                                                        <TableCell>
                                                            <TextField
                                                                value={editEquipment.name}
                                                                onChange={(e) => handleEditEquipmentInputChange('name', e.target.value)}
                                                            /></TableCell>
                                                        <TableCell>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-multiple-checkbox-label">Equipment type</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={editEquipment.type}
                                                                    label="Equipment type"
                                                                    onChange={(e) => handleEditEquipmentInputChange('type', e.target.value)}
                                                                >
                                                                    <MenuItem value={0}>DIAGNOSTIC_EQUIPMENT</MenuItem>
                                                                    <MenuItem value={1}>DURABLE_MEDICAL_EQUIPMENT</MenuItem>
                                                                    <MenuItem value={2}>TREATMENT_EQUIPMENT</MenuItem>
                                                                    <MenuItem value={3}>LIFE_SUPPORT_EQUIPMENT</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </TableCell>
                                                        <TableCell><TextField
                                                            value={editEquipment.grade}
                                                            onChange={(e) => handleEditEquipmentInputChange('grade', e.target.value)}
                                                        /></TableCell>
                                                        {editMode ? (
                                                            <>
                                                                <TableCell><TextField
                                                                    value={editEquipment.description}
                                                                    onChange={(e) => handleEditEquipmentInputChange('description', e.target.value)}
                                                                /></TableCell>
                                                                <TableCell><TextField
                                                                    value={editEquipment.quantity}
                                                                    onChange={(e) => handleEditEquipmentInputChange('quantity', e.target.value)}
                                                                /></TableCell>
                                                                <TableCell><CancelIcon className='button-remove-equipment' onClick={handleCancelEquipmentClick} /></TableCell>
                                                                <TableCell><CheckIcon className='button-remove-equipment' onClick={handleUpdateEquipmentClick} /></TableCell>
                                                            </>
                                                        ) : (<></>)}
                                                    </>
                                                ) : (
                                                    <>
                                                        <TableCell>{equipmentItem.name}</TableCell>
                                                        <TableCell>{equipmentItem.type}</TableCell>
                                                        <TableCell>{equipmentItem.grade}</TableCell>
                                                        {editMode ? (
                                                            <>
                                                                <TableCell>{equipmentItem.description}</TableCell>
                                                                <TableCell>{equipmentItem.quantity}</TableCell>
                                                                <TableCell><EditIcon className='button-remove-equipment' onClick={() => handleEditEquipmentClick(equipmentItem)} /></TableCell>
                                                                {existingReservedDates.findIndex(date => date.equipments.includes(equipmentItem.id)) === -1 ? (
                                                                    <TableCell><DeleteIcon className='button-remove-equipment' onClick={() => handleRemoveEquipmentClick(equipmentItem.id)} 
                                                                    /></TableCell>
                                                                ): (<TableCell></TableCell>)}
                                                                
                                                            </>
                                                        ) : (<></>)}
                                                    </>
                                                )}


                                            </TableRow>
                                        ))}
                                        {editMode ? (
                                            <>
                                                <TableRow>
                                                    <TableCell><TextField
                                                        value={newEquipment.name}
                                                        onChange={(e) => handleEquipmentInputChange('name', e.target.value)}
                                                    />
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-multiple-checkbox-label">Equipment type</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={newEquipment.type}
                                                                label="Equipment type"
                                                                onChange={(e) => handleEquipmentInputChange('type', e.target.value)}
                                                            >
                                                                <MenuItem value={0}>DIAGNOSTIC_EQUIPMENT</MenuItem>
                                                                <MenuItem value={1}>DURABLE_MEDICAL_EQUIPMENT</MenuItem>
                                                                <MenuItem value={2}>TREATMENT_EQUIPMENT</MenuItem>
                                                                <MenuItem value={3}>LIFE_SUPPORT_EQUIPMENT</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell><TextField
                                                        value={newEquipment.grade}
                                                        onChange={(e) => handleEquipmentInputChange('grade', e.target.value)}
                                                    /></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            value={newEquipment.description}
                                                            onChange={(e) => handleEquipmentInputChange('description', e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            value={newEquipment.quantity}
                                                            onChange={(e) => handleEquipmentInputChange('quantity', e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell><AddIcon className='button-remove-equipment' onClick={handleAddEquipmentClick} /></TableCell>
                                                </TableRow>
                                            </>
                                        ) : (<></>)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        {role === "user" ? (
                            <div>
                                <p>Datumi</p>
                            </div>
                        ) : (
                            <div></div>
                        )}

                        {editMode ? (
                            <>
                                <div style={{ width: '80vw' }}>
                                    <Grid container spacing={2} >
                                        <Grid item xs={8}>
                                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} className='justify-content-start'>
                                                <FormControl fullWidth sx={{ mt: 5, pb: 2, mb: 2, flex: '1' }}>
                                                    <InputLabel id="demo-multiple-checkbox-label">Administrators</InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-checkbox-label"
                                                        id="demo-multiple-checkbox"
                                                        label="Administrators"
                                                        value={selectedAdmin}
                                                        onChange={handleAdminChange}
                                                        MenuProps={MenuProps}
                                                    >
                                                        {companyAdministrators.map((admin) => (
                                                            <MenuItem key={admin.id} value={admin.id}>
                                                                <ListItemText primary={`${admin.first_name} ${admin.last_name}`} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>

                                                    <div className='mt-3'>
                                                        {predefinedDates.map((predefinedDate) => (
                                                            <Chip
                                                                key={predefinedDate.id}
                                                                className='mt-2'
                                                                label={`Admin: ${predefinedDate.companyAdminId}, Date: ${formatMillisecondsToDate(predefinedDate.dateTimeInMs)}, Duration: ${predefinedDate.duration} min`}
                                                                onDelete={() => handleDelete(predefinedDate.id)}
                                                            />
                                                        ))}
                                                    </div>
                                                </FormControl>

                                            </div>
                                        </Grid>
                                        <Grid item xs={4} className='d-flex flex-column'>
                                            <div className="calendar-wrapper d-flex justify-content-center p-2 mt-2">
                                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                    <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                                        <DemoItem label="Pick a date">
                                                            <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
                                                        </DemoItem>
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </div>
                                            <Box
                                                component="form"
                                                sx={{ '& > :not(style)': { m: 1, width: '100%' }, }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField
                                                    id="outlined-basic-time"
                                                    label="Starting time"
                                                    placeholder='08:00'
                                                    variant="outlined"
                                                    value={time}
                                                    onChange={handleTimeChange}
                                                />
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Duration"
                                                    variant="outlined"
                                                    value={duration}
                                                    onChange={handleDurationChange}
                                                />

                                            </Box>
                                        </Grid>
                                        <Button variant="contained" className='button-add mb-3' onClick={handleAddClick}>
                                            Add
                                        </Button>
                                    </Grid>
                                </div>

                            </>
                        ) : (<div></div>)}
                    </div>
                    {role === "companyAdmin" ? (
                        <div style={{ width: '80vw', margin: 'auto' }}>
                            {editMode ? (
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" onClick={handleSaveClick} className='button-wrapper' color="secondary">
                                        Save
                                    </Button>
                                    <Button variant="outlined" onClick={handleCancelClick} className='button-cancel' color="secondary">
                                        Cancel
                                    </Button>
                                </Stack>
                            ) : (
                                <Button variant="contained" onClick={handleEditClick} className='button-wrapper' color="secondary">
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
