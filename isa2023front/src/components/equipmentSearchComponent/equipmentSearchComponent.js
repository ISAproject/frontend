import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button,TextField,Rating} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './equipment-search-component.css';
import {findEquipmentByName, GetEquipments} from "../../services/EquipmentService";
function EquimentCard({ equipment }) {
    const equipmentDetailsLink = `/equipment/${equipment.id}`;

    return (
        <Link to={equipmentDetailsLink} style={{ textDecoration: 'none' }}>
            <Card variant="outlined" sx={{ minWidth: 275, margin: 2, flex: '1 1 300px', cursor: 'pointer' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {equipment.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {equipment.type}
                    </Typography>
                    <Typography variant="body2">
                        Grade: {equipment.grade}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

function EquipmentSearchComponent() {
    const [equipments, setEquipments] = useState([]);
    const [textboxValue,setTextboxValue]=useState('');
    const [ratingValue,setRatingValue]=useState(0);
    const [hover, setHover] = React.useState(-1);

    useEffect(() => {
        GetEquipments()
            .then((res) => {
                setEquipments(res.data);
            })
            .catch((error) => console.error('Error fetching equipments data:', error));
    }, []);

    const handleTextBoxChange = (event) => {
        setTextboxValue(event.target.value);
    };
    const handleSearch=()=>{
        findEquipmentByName(textboxValue,ratingValue)
            .then((res) => {
                setEquipments(res.data);
            })
            .catch((error) => console.error('Error fetching equipments data:', error));

    }

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    return (
        <>
            <h1>Equipments</h1>
            <Box
                borderRadius={10}  // Set the border radius
                padding={5}
                sx={{
                    background: 'radial-gradient(ellipse 75% 200px at center,#e5f3d0 40%, transparent 70%)',
                    marginLeft:'60px',
                    marginRight:'60px',
                    width:'80vw'
                }}>
                <Box
                    sx={{

                        display: 'flex',
                        flexDirection:'column',
                        marginLeft:'100px',
                        marginRight:'100px',

                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent:'center',
                            flexDirection:'column',
                            marginBottom:'10px'
                        }}>
                        <TextField
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            color='secondary'
                            value={textboxValue}
                            onChange={handleTextBoxChange}
                            fullWidth
                            margin='normal'
                            focused/>
                        <label className='labelClass'>Rating: </label>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection:'row',
                            width:'200px',
                            margin:'normal',
                            justifyContent:'space-between'
                        }}>

                            <Rating
                                name="hover-feedback"
                                value={ratingValue}
                                precision={0.5}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setRatingValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                size='large'
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"/>}
                            />

                            {ratingValue !== null && (
                                <Box sx={{ ml: 2,color:'secondary' }}>{labels[hover !== -1 ? hover : ratingValue]}</Box>
                            )}
                        </Box>
                    </Box>

                    <Button variant="contained" onClick={handleSearch} color='secondary'>Search</Button>
                </Box>
            </Box>

            {equipments.map((equipment) => (
                <EquimentCard key={equipment.id} equipment={equipment} />
            ))}

        </>
    );
}

export default EquipmentSearchComponent;
