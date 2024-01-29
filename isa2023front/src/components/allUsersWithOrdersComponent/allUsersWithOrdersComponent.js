import React, { useEffect, useState } from 'react';
import { GetUserByUsername } from "../../services/UserService";
import { GetReservedDatesByCompanyId } from "../../services/ReservedDateService";
import { useParams } from 'react-router-dom';
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
import { GetUsersWithOrdersByComapny } from '../../services/UserService';


function AllUsersWithOrdersComponent() {
    const [user, setUser] = useState({})
    const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

    const { id } = useParams();
    const [usersWithOrders, setUsersWithOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!authUser)
                    return;

                const userRes = await GetUserByUsername(authUser?.username);
                const usersWithOrdersRes = await GetUsersWithOrdersByComapny(id);

                setUser(userRes.data);

                filterUsers(usersWithOrdersRes);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const filterUsers = async(usersWithOrdersRes) => {
        var usersWithOrdersData = usersWithOrdersRes.data;
        var filteredUsers = [];
        
        const orderRes = await GetReservedDatesByCompanyId(id);

        for(var userWithOrder of usersWithOrdersData){
            var order = {} 
            orderRes.data.forEach(o => {
                if(o.userId == userWithOrder.id && !o.pickedUp){
                    order = o;
                }
            }); 

            if (order.id !== undefined)
                filteredUsers.push(userWithOrder);
        }

        setUsersWithOrders(filteredUsers);
    }

    function logOut() {
        window.location.href = '/home';
        authService.logout();
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
            <h2>Users that made reservations at this company</h2><br />
            <TableContainer component={Paper} sx={{ maxWidth: '80vw', margin: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#609577" }}>
                            <TableCell sx={{ color: "white" }}>Name</TableCell>
                            <TableCell sx={{ color: "white" }}>Last name</TableCell>
                            <TableCell sx={{ color: "white" }}>Email</TableCell>
                            <TableCell sx={{ color: "white" }}>Penalty points</TableCell>
                            <TableCell sx={{ color: "white" }}>Tel. number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersWithOrders.map((user, index) => (
                            <>

                                <TableRow key={user.id}>

                                    <TableCell>{user.first_name}</TableCell>
                                    <TableCell>{user.last_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.penaltyPoints}</TableCell>
                                    <TableCell>{user.tel_number}</TableCell>

                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer><br />
        </>
    )
}

export default AllUsersWithOrdersComponent;