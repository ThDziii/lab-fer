import React from 'react';
import { Container, TextField, Button, Typography, Box, InputLabel, Select, FormControlLabel, Switch, MenuItem, FormControl, styled } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NavBar from '../components/navBar';
import Footer from '../components/footer';

const DarkPinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#d81b60',
    '&:hover': {
      backgroundColor: 'rgba(216, 27, 96, 0.08)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#d81b60',
  },
}));

const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      program: 0,
      message: "",
      agree: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
      email: Yup.string().required("Required.").email("Invalid email"),
      phone: Yup.number().integer().typeError("Please enter a valid number"),
      program: Yup.number().integer().typeError("Please select a program."),
      message: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
      agree: Yup.boolean().oneOf([true], "The terms and conditions must be accepted."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <NavBar />
      <Container maxWidth="sm">
        <div style={{paddingBottom:'4%', paddingTop:'4%'}}>
        <Box sx={{ my: 4, p: 3, borderRadius: 2, bgcolor: 'rgba(255, 182, 193, 0.1)', boxShadow: 3}}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#FF69B4', textAlign: 'center' }}>
            Contact Us
          </Typography>
          <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputLabelProps={{ style: { color: '#FF69B4' } }}
              InputProps={{ style: { borderColor: '#FF69B4' } }}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputLabelProps={{ style: { color: '#FF69B4' } }}
              InputProps={{ style: { borderColor: '#FF69B4' } }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              margin="normal"
              variant="outlined"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputLabelProps={{ style: { color: '#FF69B4' } }}
              InputProps={{ style: { borderColor: '#FF69B4' } }}
            />
            <FormControl fullWidth margin="normal" error={formik.touched.program && Boolean(formik.errors.program)}>
              <InputLabel id="program-label" style={{ color: '#FF69B4' }}>Program of Study</InputLabel>
              <Select
                labelId="program-label"
                id="program"
                label="Program of Study"
                name="program"
                value={formik.values.program}
                onChange={formik.handleChange}
                style={{ color: '#FF69B4' }}
              >
                <MenuItem value={0}>
                  <em>Please select</em>
                </MenuItem>
                <MenuItem value={1}>Software Engineering</MenuItem>
                <MenuItem value={2}>Information System</MenuItem>
                <MenuItem value={3}>Information Assurance</MenuItem>
                <MenuItem value={4}>Internet of Things</MenuItem>
                <MenuItem value={5}>Artificial Intelligence</MenuItem>
                <MenuItem value={6}>Digital Art & Design</MenuItem>
              </Select>
              {formik.touched.program && formik.errors.program && (
                <Typography variant="caption" color="error">{formik.errors.program}</Typography>
              )}
            </FormControl>
            <TextField
              fullWidth
              id='outlined-multiline-static'
              label="Message"
              multiline
              margin="normal"
              variant="outlined"
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              InputLabelProps={{ style: { color: '#FF69B4' } }}
              InputProps={{ style: { borderColor: '#FF69B4' } }}
            />
            <FormControlLabel
              control={
                <DarkPinkSwitch
                  name="agree"
                  checked={formik.values.agree}
                  onChange={formik.handleChange}
                />
              }
              label="Agree to terms and conditions."
            />
            {formik.touched.agree && formik.errors.agree && (
              <Typography variant="caption" color="error">{formik.errors.agree}</Typography>
            )}
            <br></br>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                backgroundColor: '#ec407a',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#f48fb1',
                },
              }}
            >
              Send
            </Button>
          </form>
        </Box>
        </div>
      </Container>
      <Footer/>
    </div>
  );
};

export default ContactPage;
