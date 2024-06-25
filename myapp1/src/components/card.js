import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Container, Grid, Pagination, Typography } from '@mui/material';
import BasicPagination from './Pagination';
import { useState, useEffect } from 'react';
import { routes } from '../routes';
import { Link } from 'react-router-dom';

export default function MyCard() {
    const [orchids, setOrchids] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 4;
    const totalPage = Math.ceil(orchids.length / itemsPerPage);
    console.log(orchids.length);

    useEffect(() => {
        fetch('https://66761bf3a8d2b4d072f26f6a.mockapi.io/api/OrchidList')
            .then(response => response.json())
            .then(data => setOrchids(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChangePage = (event, value) => {
        setPage(value);
        console.log(value);
    };

    const paginatedData = orchids.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    console.log(paginatedData);

    return (
        <div style={{ minHeight: '74vh' }}>
            <Grid container spacing={2} className='card'>
                {paginatedData.map((orchid) => (
                    <Grid item xs={12} md={3} key={orchid.id} className='card-grid'>
                        <Card className='card-card'>
                            <CardMedia
                                component="img"
                                alt={orchid.name}
                                height="140"
                                image={orchid.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {orchid.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`${routes.detail}/${orchid.id}`}>
                                    <Button size="small">
                                        Learn More
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <BasicPagination
                    count={totalPage}
                    page={page}
                    onChange={handleChangePage} />
            </div>
        </div>
    );
}
