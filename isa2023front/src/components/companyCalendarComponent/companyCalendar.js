import React, {useEffect, useState} from "react";
import {GetByComapany, GetByComapanyByWeek,GetByComapanyByMonth,GetByComapanyByYear} from "../../services/ReservedDateService";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import './companyCalendar.css';
import {Link, useParams} from "react-router-dom";
// import {
//     Table,
//     Header,
//     HeaderRow,
//     Body,
//     Row,
//     HeaderCell,
//     Cell,
// } from "@table-library/react-table-library/table";
import { Button,TextField,Rating} from '@mui/material';
import authService from "../../services/auth.service";

//import { useTheme } from "@table-library/react-table-library/theme";

function formatMillisecondsToDate(milliseconds) {
    const date = new Date(milliseconds);
    return date.toLocaleString('en-GB'); // Adjust the format based on your requirements

}
function logOut() {
    window.location.href='/home';
    authService.logout();
}
function CompanyCalendarComponent() {
    const [reservedDates, setReservedDates] = useState([]);
    const [timeRadio, setTimeRadio] = useState(0);
    const id = useParams().id;
    function showDates(radio,month,year) {
        if(timeRadio===0)
            GetByComapanyByWeek(id).then((res)=>
            {
                setReservedDates(res.data);
            })
                .catch((error) => console.error('Error fetching company data:', error));
        else
            if(timeRadio===1)
                GetByComapanyByMonth(id,month-1,year).then((res)=>
                {
                    setReservedDates(res.data);
                })
                    .catch((error) => console.error('Error fetching company data:', error));
            else
                if(timeRadio===2)
                    GetByComapanyByYear(id,year).then((res)=>
                    {
                        setReservedDates(res.data);
                    })
                        .catch((error) => console.error('Error fetching company data:', error));
                else
                    GetByComapany(id)
                        .then((res) => {
                            setReservedDates(res.data);
                        })
                        .catch((error) => console.error('Error fetching company data:', error));
    }
    useEffect(() => {
        GetByComapany(id)
            .then((res) => {
                setReservedDates(res.data);
            })
            .catch((error) => console.error('Error fetching company data:', error));
    }, []);

    const [selectedMonth, setSelectedMonth] = useState(12);
    const [selectedYear, setSelectedYear] = useState(2023);
    const [selectedOption, setSelectedOption] = useState('weekly');

        const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
            if(event.target.value==='weekly') {
                setTimeRadio(0);
            }
            else
                if(event.target.value==='monthly') {
                    setTimeRadio(1);
                    setSelectedMonth(1);
                    setSelectedYear(2023);
                }
                else
                    if(event.target.value==='yearly'){
                    setTimeRadio(2);
                    setSelectedYear(2023);
                    }
                    else
                    {
                        setTimeRadio(3);
                    }
        }
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    }
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);

    }

    const currentYear = new Date().getFullYear();
    const endYear = 2030;

    const years = Array.from({ length: endYear - currentYear + 1 }, (_, index) => currentYear + index);


    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];


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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <span style={{ fontWeight: 'bold' }}>MediConnect</span>
                    </Typography>
                    <Button color="accent" component={Link} to="/home">Home</Button>
                    <Button color="accent" component={Link} onClick={logOut}>Logout</Button>
                </Toolbar>
            </AppBar>
            <br></br>


            <div className="date-selector-container">
                <label className="label1">
                    <input
                        type="radio"
                        value="weekly"
                        checked={selectedOption === 'weekly'}
                        onChange={handleOptionChange}
                    />
                    Weekly
                </label>

                <label className="label1">
                    <input
                        type="radio"
                        value="monthly"
                        checked={selectedOption === 'monthly'}
                        onChange={handleOptionChange}
                    />
                    Monthly
                </label>

                <label className="label1">
                    <input
                        type="radio"
                        value="yearly"
                        checked={selectedOption === 'yearly'}
                        onChange={handleOptionChange}
                    />
                    Yearly
                </label>
                <label className="label1">
                    <input
                        type="radio"
                        value="all"
                        checked={selectedOption === 'all'}
                        onChange={handleOptionChange}
                    />
                    All
                </label>
            </div>


            <div>
                {timeRadio===1 ? (
                    <div>

                        <div className="year-dropdown-container" >
                            <label htmlFor="yearSelect" className="label">
                                Select a Year:
                            </label>
                            <select id="yearSelect" className="select" onChange={handleYearChange}
                            >
                                {years.map((year, index) => (

                                        <option key={index} value={year} className="option">
                                            {year}
                                        </option>
                                    )
                                )}

                            </select>
                        </div>
                        <div className="month-dropdown-container">
                            <label htmlFor="monthSelect" className="label">Select a Month: </label>
                            <select id="monthSelect" className="select"  onChange={handleMonthChange}>
                                {months.map((month, index) => (
                                    <option key={index} value={index + 1} className="option">
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    ):
                    (
                        <br></br>
                    )}
                {timeRadio===2 ? (

                            <div className="year-dropdown-container" >
                                <label htmlFor="yearSelect" className="label">
                                    Select a Year:
                                </label>
                                <select id="yearSelect" className="select" onChange={handleYearChange}
                                >
                                    {years.map((year, index) => (

                                            <option key={index} value={year} className="option">
                                                {year}
                                            </option>
                                        )
                                    )}

                                </select>
                            </div>

                    ):
                    (
                        <br></br>
                    )}
            </div>
            <button className="button"  onClick={() => showDates(true,selectedMonth , selectedYear)}>Show</button>
            <br></br>
            <table className="my-table">
                <thead>
                <tr>
                    <th className="table-header">Date</th>
                    <th className="table-header">User</th>
                    <th className="table-header">Duration</th>
                    <th className="table-header">Equipments</th>
                </tr>
                </thead>
                <tbody>
                {reservedDates.map((item) => (
                    <tr key={item.id}>
                        <td className="table-cell">{formatMillisecondsToDate(item.dateTimeInMS)}</td>
                        <td className="table-cell">{item.userName} {item.userSurname}</td>
                        <td className="table-cell">{item.duration}</td>
                        <td className="table-cell">{item.equipments.join(', ')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/*<Table data={reservedDates} layout={{ fixedHeader: true }}>*/}
            {/*    {(tableList) => (*/}
            {/*        <>*/}
            {/*            <Header>*/}
            {/*                <HeaderRow>*/}
            {/*                    <HeaderCell>Date</HeaderCell>*/}
            {/*                    <HeaderCell>User</HeaderCell>*/}
            {/*                    <HeaderCell>Duration</HeaderCell>*/}
            {/*                    <HeaderCell>Equipments</HeaderCell>*/}
            {/*                </HeaderRow>*/}
            {/*            </Header>*/}

            {/*            <Body>*/}
            {/*                {tableList.map((item) => (*/}
            {/*                    <Row key={item.id} item={item}>*/}
            {/*                        <Cell>{item.dateTimeInMS.toLocaleDateString("en-US", {*/}
            {/*                            year: "numeric",*/}
            {/*                            month: "2-digit",*/}
            {/*                            day: "2-digit",*/}
            {/*                        })}</Cell>*/}
            {/*                        <Cell>{item.userId}</Cell>*/}
            {/*                        <Cell>{item.duration}</Cell>*/}
            {/*                        <Cell>{item.equipments}</Cell>*/}
            {/*                    </Row>*/}
            {/*                ))}*/}
            {/*            </Body>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</Table>*/}

        </>
    );
}

export default CompanyCalendarComponent;
