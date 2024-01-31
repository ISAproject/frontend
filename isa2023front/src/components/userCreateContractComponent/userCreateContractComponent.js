import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import { GetEquipmentByCompanyId } from '../../services/EquipmentService';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import authService from "../../services/auth.service";
import { AddContract, DeleteContractById, GetContractByUserId, SendMessage, GetResponse, } from '../../services/ContractService';
import TextField from '@mui/material/TextField';
import { GetUserByUsername } from "../../services/UserService";
import { GetCompanyById } from "../../services/CompanyService";
import io from 'socket.io-client';

function UserCreateContractComponent({ companyId }) {
    const [open, setOpen] = React.useState(false);
    const [equipment, setEquipment] = React.useState([]);
    const [quantity, setQuantity] = React.useState([]);
    const [dayInMonth, setDayInMonth] = React.useState(0);
    const [alreadyHasContractFlag, setAlreadyHasContractFlag] = React.useState(false);
    const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null;
    const [user, setUser] = useState();
    const [userId, setUserId] = React.useState(0);
    const [contractId, setContractId] = React.useState(0);
    const [company, setCompany] = useState();
    const [reload, setReload] = useState(true);
    const [contractData, setContractData] = useState({});

    useEffect(() => {
        if (authUser) {
            if (reload) {
                setReload(false);
                GetUserByUsername(authUser.username).then((res) => {
                    setUser(res.data);
                    setUserId(res.data.id);

                    GetContractByUserId(res.data.id).then((res) => {
                        setContractId(res.data.id);
                        if (res.data.companyId != companyId && res.data.companyId !== undefined) {
                            setAlreadyHasContractFlag(true);
                        }

                        GetCompanyById(companyId).then((resComp) => {
                            setCompany(resComp.data);
                        })

                        GetEquipmentByCompanyId(companyId).then((resEq) => {
                            let equip = resEq.data;
                            setEquipment(equip);
                            let quant = Array.from({ length: equip.length }, () => 0);
                            if (res.data.id !== undefined) {
                                for (let i = 0; i < res.data.equipments.length; i++) {
                                    for (let j = 0; j < equip.length; j++) {
                                        if (res.data.equipments[i] == equip[j].id) {

                                            quant[j] = res.data.quantity[i];
                                            setQuantity(quant);
                                            break;
                                        }
                                    }
                                }
                                setDayInMonth(res.data.dateTimeInMS);
                            }
                            else {
                                setQuantity(quant);
                            }



                        });
                    });

                });
            }
        }


    }, [open]);

    const handleClickOpen = () => {
        if (alreadyHasContractFlag) {
            if (!toast.isActive(9))
                toast.error("You have a contract with other company already", {
                    toastId: 9
                });
            return;
        }
        setOpen(true);
        //console.log(quantity);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleQuantityChange = (index) => (event) => {

        // if(event.target.value>equipment[index].quantity  ){
        //     if(! toast.isActive(2))
        //         toast.warning("Max quantity reached",{
        //             toastId:2
        //         });
        //     return;
        // }
        //else 
        if (event.target.value < 0) {
            if (!toast.isActive(1))
                toast.warning("Quantity must be posiitve", {
                    toastId: 1
                });
            return;
        }
        let updatedQuantity = [...quantity];
        updatedQuantity[index] = parseInt(event.target.value);
        setQuantity(updatedQuantity);
    };
    const handleDayInMonth = (event) => {
        if (event.target.value > 28 || event.target.value < 0) {
            if (!toast.isActive(1))
                toast.warning("please enter a value in range from 0 to 28", {
                    toastId: 3
                });
            return;
        }
        setDayInMonth(event.target.value);
    };
    const handleCreate = () => {
        let quantityTemp = [...quantity]
        let equipmentTemp = [...equipment]
        for (let i = 0; i < quantityTemp.length; i++) {
            if (quantity[i] <= 0) {
                quantityTemp.splice(i, 1);
                equipmentTemp.splice(i, 1);
                i--;
            }

        }
        equipmentTemp = equipmentTemp.map(obj => obj.id);
        let contract = {
            id: 0,
            companyId: companyId,
            userId: userId,
            dateTimeInMS: dayInMonth,
            equipments: equipmentTemp,
            quantity: quantityTemp
        };

        setContractData(contract);

        var message = {
            messageId: 0,
            message: "",
            messageDate: null
        }

        message.message = "------------CONTRACT-------------\n"
            + "Company name: " + company.name + "\n"
            + "Company address: " + company.address + "\n"
            + "User: " + user.username + "\n"
            + "Equipment: ";

        var i = 0;
        contract.equipments.forEach(eq => {
            if (i != 0)
                message.message += "\t";

            message.message += equipment.find(equipm => equipm.id == eq).name + " " + contract.quantity[i] + ",\n";
            i++;
        })

        message.message += "Every " + contract.dateTimeInMS + "th of a month.";

        SendMessage(message);

        AddContract(contract).then(() => {
            toast.success("Contract saved");
            setOpen(false);
        });
    };

    const handleDelete = () => {
        DeleteContractById(contractId).then(() => {
            toast.success("Contract deleted");
            setOpen(false);
        });

    };
    return (
        <>
            <Button variant="contained" color='secondary' onClick={handleClickOpen}>Contract</Button>
            <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth >
                <DialogTitle>Contract</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Pick quantity:
                    </DialogContentText>
                    <React.Fragment>
                        <Box sx={{ margin: 'auto', mt: 1, bgcolor: 'background.paper' }} >
                            <TableContainer component={Paper} sx={{ maxWidth: '100%', height: '40vh' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: '#004D40' }}>
                                            <TableCell sx={{ color: 'white' }}>Equipment name</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Type</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Grade</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {equipment.map((equipmentItem, index) => (
                                            <TableRow key={equipmentItem.id}>
                                                <TableCell>{equipmentItem.name}</TableCell>
                                                <TableCell>{equipmentItem.type}</TableCell>
                                                <TableCell>{equipmentItem.grade}</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                        sx={{ width: "70px" }}
                                                        value={quantity[index]}
                                                        onChange={handleQuantityChange(index)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </React.Fragment>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <p>Enter the day in month:</p>
                        <TextField label="Day in month"
                            variant="outlined"
                            sx={{ mt: "2vh" }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            value={dayInMonth}
                            onChange={handleDayInMonth}>
                        </TextField>
                    </Box>
                    <Box sx={{ width: "100%", justifyContent: "space-evenly", display: "flex" }}>
                        <Button variant="contained" color='secondary' sx={{ width: "30%", mt: "2vh" }} onClick={handleCreate}>Request</Button>
                        <Button variant="contained" color='secondary' sx={{ width: "30%", mt: "2vh" }} onClick={handleDelete}>Delete</Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="colored" />
        </>
    );
}

export default UserCreateContractComponent;