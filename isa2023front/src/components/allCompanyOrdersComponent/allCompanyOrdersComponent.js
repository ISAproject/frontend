import React, { useEffect, useState } from 'react';
import { GetUserByUsername } from "../../services/UserService";
import { GetReservedDatesByCompanyId } from "../../services/ReservedDateService";
import { useParams } from 'react-router-dom';
import { Tab } from 'bootstrap';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import authService from "../../services/auth.service";
import Chip from '@mui/material/Chip';



function AllCompanyOrdersComponent() {
    const [user, setUser] = useState({})
    const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

    const [orders, setOrders] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!authUser)
                    return;

                const userRes = await GetUserByUsername(authUser?.username);
                const ordersRes = await GetReservedDatesByCompanyId(id);

                setUser(userRes.data);
                setOrders(ordersRes.data);
                console.log(ordersRes.data)
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [])

    function logOut() {
        window.location.href = '/home';
        authService.logout();
    }

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
                            <MonitorHeartIcon />
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
                                <Button color="accent" component={Link} to="/companies">Companies</Button>
                                <Button color="accent" component={Link} onClick={logOut}>Logout</Button>
                            </>
                            : <><Button color="accent" component={Link} to="/login">Login</Button>
                                <Button color="accent" component={Link} to="/register">Register</Button>
                            </>}

                    </Toolbar>
                </AppBar>
            </Box><br /><br />
            <TableContainer component={Paper} sx={{ maxWidth: '80vw', margin: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User ordering</TableCell>
                            <TableCell>Company admin delivering</TableCell>
                            <TableCell>Date and Time</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Equipment</TableCell>
                            <TableCell>Picked up</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <>

                                <TableRow key={order.id}>

                                    <TableCell>{order.userName}</TableCell>
                                    <TableCell>{order.companyAdminName}</TableCell>
                                    <TableCell>{formatMillisecondsToDate(order.dateTimeInMs)}</TableCell>
                                    <TableCell>{order.duration}min</TableCell>
                                    <TableCell sx={{padding: '0px'}}>
                                        {order.equipmentNames.length > 1 ?
                                        <>
                                        <Table size="small" >
                                            <TableBody >
                                                {order.equipmentNames.map((name, index) => (
                                                    <TableRow key={index} >
                                                        <TableCell >{name}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        </>
                                        :
                                        <>
                                            <span className='ps-3'>{order.equipmentNames}</span>
                                        </>
                                        }
                                    </TableCell>
                                    <TableCell>{order.pickedUp}</TableCell>

                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AllCompanyOrdersComponent;