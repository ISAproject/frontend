import React, { useEffect, useState } from 'react';
import { GetUserByUsername } from "../../services/UserService";
import { GetReservedDatesByCompanyId, DeleteById, UpdatePickedUpStatus } from "../../services/ReservedDateService";
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
import { AiOutlineCheck } from "react-icons/ai";
import { GetUserById, UpdateUser, GetUsersWithOrdersByComapny } from '../../services/UserService';
import { findEquipmentById, UpdateEquipment} from '../../services/EquipmentService';
import './allCompanyOrdersComponent.css';
import {UploadQRCode} from "../../services/ReservedDateService";


function OrdersInformationComponent() {
    const [user, setUser] = useState({})
    const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;

    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const [usersWithOrders, setUsersWithOrders] = useState([]);
    const [file, setFile] = useState();
    const [uploadedQR, setuploadedQR] = useState();
    const [text, setText] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!authUser)
                    return;

                const userRes = await GetUserByUsername(authUser?.username);
                const ordersRes = await GetReservedDatesByCompanyId(id);

                setUser(userRes.data);
                processOrders(ordersRes);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const processOrders = async (ordersRes) => {
        var ordersList = [];
        for (const order of ordersRes.data) {

            console.log(Date.now())
            if (order.dateTimeInMs + order.duration * 60000 < Date.now()) {
                await DeleteById(order.id);

                const UserRes = await GetUserById(order.userId);
                var user = UserRes.data;

                let user1 = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    state: user.state,
                    city: user.city,
                    tel_number: user.tel_number,
                    password: user.password,
                    role: user.role,
                    company_info: user.company_info,
                    occupation: user.occupation,
                    verified: user.verified,
                    penaltyPoints: user.penaltyPoints,
                    firstLogin: user.firstLogin
                };

                user1.penaltyPoints += 2;
                const UpdatedUser = await UpdateUser(user1.id, user1);
            }
            else {
                if (!order.pickedUp)
                    ordersList.push(order)
            }
        }

        setOrders(ordersList);
    };

    function logOut() {
        window.location.href = '/home';
        authService.logout();
    };

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const formatMillisecondsToDate = (milliseconds) => {
        const date = new Date(milliseconds);
        return formatDate(date);
    };

    const handlePickedUpClick = async (selectedOrder) => {
        const updatedReservedDate = await UpdatePickedUpStatus(selectedOrder.id, true);

        if (updatedReservedDate) {
            filterTables(selectedOrder);

            decreaseEquipmentQuantity(selectedOrder);
        }
    }

    function filterTables(selectedOrder) {
        var filteredorders = orders.filter(o => o.id != selectedOrder.id);
        setOrders(filteredorders);
    }

    const decreaseEquipmentQuantity = async (selectedOrder) => {
        for (var id of selectedOrder.equipmentIds) {
            var equipmentRes = await findEquipmentById(id);
            var equipment = equipmentRes.data;
            equipment.quantity--;

            var updatedEquipmentRes = await UpdateEquipment(id, equipment);
            console.log(equipment.quantity, updatedEquipmentRes.data.quantity)
        }
    }

    function handleChange(e) {
        if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
        setuploadedQR(URL.createObjectURL(e.target.files[0]));
    }

    const uploadQRCode = async (e)=> {
        const formData = new FormData();
        formData.append("qrCode",file)
        var filesize = ((file.size/1024)/1024).toFixed(4);
        if(filesize<0.5)
        {
            const id = await UploadQRCode(formData);
            if (id.data === 9696969)
                alert("QR code is already scanned!");
            else {
                if(id.data === 96969699)
                    alert("This is not QR code!");
                else {
                    if (id) {
                        filterTablesWithQRCode(id);
                        decreaseEquipmentQuantityWithQRCode(id);
                        alert("You successfully scanned QR code!");
                    }
                }
            }
        }
        else
        {
            alert("File is too large!");
        }
    }
    function filterTablesWithQRCode(selectedOrderId) {
        var filteredorders = orders.filter(o => o.id != selectedOrderId.data);
        setOrders(filteredorders);
        var selectedOrder=orders.find(o=>o.id===selectedOrderId.data);
        if(selectedOrder) {
            if (!filteredorders.find(o => o.userId == selectedOrder.userId)) {
                var filteredUsers = usersWithOrders.filter(u => u.id != selectedOrder.userId);
                setUsersWithOrders(filteredUsers);
            }
        }
    }

    const decreaseEquipmentQuantityWithQRCode = async (selectedOrderId) =>{
        var selectedOrder=orders.find(o=>o.id===selectedOrderId.data);
        if(selectedOrder) {
            for (var id of selectedOrder.equipmentIds) {
                var equipmentRes = await findEquipmentById(id);
                var equipment = equipmentRes.data;
                equipment.quantity--;

                var updatedEquipmentRes = await UpdateEquipment(id, equipment);
                console.log(equipment.quantity, updatedEquipmentRes.data.quantity)
            }
        }
    }

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
            <h2>Orders</h2><br />
            <TableContainer component={Paper} sx={{ maxWidth: '80vw', margin: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#609577" }}>
                            <TableCell sx={{ color: "white" }}>User ordering</TableCell>
                            <TableCell sx={{ color: "white" }}>Company admin delivering</TableCell>
                            <TableCell sx={{ color: "white" }}>Date and Time</TableCell>
                            <TableCell sx={{ color: "white" }}>Duration</TableCell>
                            <TableCell sx={{ color: "white" }}>Equipment</TableCell>
                            <TableCell sx={{ color: "white" }}>Picked up</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => (
                            <>

                                <TableRow key={order.id}>

                                    <TableCell>{order.userName}</TableCell>
                                    <TableCell>{order.companyAdminName}</TableCell>
                                    <TableCell>{formatMillisecondsToDate(order.dateTimeInMs)}</TableCell>
                                    <TableCell>{order.duration}min</TableCell>
                                    <TableCell sx={{ padding: '0px' }}>
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
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: "#c5ab85" }}
                                            onClick={() => handlePickedUpClick(order)}
                                            disabled={!(order.dateTimeInMs < Date.now() && Date.now() <= order.dateTimeInMs + order.duration * 60000)}

                                        >
                                            <AiOutlineCheck />
                                        </Button>
                                        {console.log(order.dateTimeInMs < Date.now() )}
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/><br/>
            <h2>Upload QR code:</h2>
            <div className="qr-code">
                <div>
                    <input type="file" onChange={handleChange} className="input-button"/>

                </div>
                <img src={uploadedQR} className="max-height" />
                {file?
                    <Button variant="contained" sx={{ backgroundColor: "#c5ab85" }} onClick={(e)=>uploadQRCode(e)}> Scan QR code</Button>
                    :
                    <></>
                }
            </div>
            <br/><br/>
        </>
    )
}

export default OrdersInformationComponent;