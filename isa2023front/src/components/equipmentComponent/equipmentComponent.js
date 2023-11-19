import React, { useEffect, useState } from 'react';
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
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "../../services/EquipmentService";
import {findEquipmentById} from "../../services/EquipmentService";
import {GetCompanyById} from "../../services/CompanyService";

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

function EquipmentComponent() {
    const id = useParams().id;

    const [equipmentData, setEquipmentData] = useState({
        id: 0,
        name: "",
        type: "",
        description: "",
        grade: 0,
        quantity: 0,
        companyId: []
    });
    const [companies, setCompanies] = useState([]);
    //const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const equipmentResponse = await findEquipmentById(id);
                setEquipmentData(equipmentResponse.data);

                const companyResponses = await Promise.all(
                    equipmentResponse.data.companyId.map((companyId) => GetCompanyById(companyId))
                );

                const companies = companyResponses.map((res) => res.data);
                setCompanies(companies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10vh'}}>
            <Stack spacing={2} direction="column">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '90vw' }}>
                    <TableContainer component={Paper} sx={{ maxWidth: '90vw', margin: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Grade</TableCell>
                                    <TableCell>Companies</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>

                                            <TableCell>{equipmentData.name}</TableCell>
                                            <TableCell>{equipmentData.type}</TableCell>
                                            <TableCell>{equipmentData.description}</TableCell>
                                            <TableCell>{equipmentData.grade}</TableCell>

                                        {companies
                                            ? companies.map((company, index) => (
                                                <TableCell key={index}>{company?.name}</TableCell>
                                            ))
                                            : <TableCell>Nothing</TableCell>
                                        }


                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
            </Stack>
        </div>
    );
}

export default EquipmentComponent;
