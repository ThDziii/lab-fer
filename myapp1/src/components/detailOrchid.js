import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import Navbar from '../components/navBar.js';
import Footer from './footer.js';

const OrchidDetail = () => {
    const { id } = useParams();
    const [orchid, setOrchid] = useState(null);

    useEffect(() => {
        fetch(`https://66761bf3a8d2b4d072f26f6a.mockapi.io/api/OrchidList/${id}`)
            .then(response => response.json())
            .then(data => setOrchid(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    if (!orchid) {
        return (
            <div>
                <Navbar />
                <Typography variant="h6" gutterBottom>
                    Product not found
                </Typography>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                    p: 5,
                    bgcolor: 'white',
                }}
            >
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={5}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 0,
                                paddingBottom: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '50%',
                                boxShadow: 3,
                            }}
                        >
                            <img
                                src={orchid.image}
                                alt={orchid.name}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <CardContent>
                            <Typography style={{ textAlign: 'left', color: '#C71585' }} variant="h3" component="div" gutterBottom>
                                {orchid.name}
                            </Typography>
                            <Typography style={{ textAlign: 'left', color: '#C71585' }} variant="body1" color="text.secondary" paragraph>
                                Rating: {orchid.rating}
                            </Typography>
                            <Typography style={{ textAlign: 'left', color: '#C71585' }} variant="body1" color="text.secondary" paragraph>
                                Special: {orchid.isSpecial ? 'Yes' : 'No'}
                            </Typography>
                            <Typography style={{ textAlign: 'left', color: '#C71585' }} variant="body1" color="text.secondary" paragraph>
                                Color: {orchid.color}
                            </Typography>
                            <Typography style={{ textAlign: 'left', color: '#C71585' }} variant="body1" color="text.secondary" paragraph>
                                Origin: {orchid.origin}
                            </Typography>
                            <Typography style={{ textAlign: 'left', color: '#C71585' }} variant="body1" color="text.secondary" paragraph>
                                Category: {orchid.category}
                            </Typography>
                            <Typography style={{ textAlign: 'left', color: '#C71585' }} variant="body1" color="text.secondary" paragraph>
                                {orchid.description}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </div>
    );
};

export default OrchidDetail;
