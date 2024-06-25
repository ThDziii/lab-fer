import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: '#fce4ec', 
                color: '#ec407a'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Orchid Shop
                        </Typography>
                        <Typography variant="body2">
                            Your one-stop shop for all things orchids. From seeds to fully bloomed flowers, we have it all.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Links
                        </Typography>
                        <Link href="/terms" color="inherit" sx={{ display: 'block' }}>
                            Terms of Service
                        </Link>
                        <Link href="/privacy" color="inherit" sx={{ display: 'block' }}>
                            Privacy Policy
                        </Link>
                        <Link href="/contact" color="inherit" sx={{ display: 'block' }}>
                            Contact Us
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Link href="#" color="inherit" sx={{ display: 'block' }}>
                            Facebook
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: 'block' }}>
                            Instagram
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: 'block' }}>
                            Twitter
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={3} textAlign="center">
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} Orchid Shop. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
