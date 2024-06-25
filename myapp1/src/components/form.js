import { Button, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap';

export default function Form() {
    const [newUser, setNewUser] = useState({
        UserName: "UserName",
        Email: "Email",
        PhoneNumber: "PhoneNumber",
        createdAt: new Date().toLocaleString(),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date().toLocaleString();
            const response = await axios.post(
                "https://6672cdaf6ca902ae11b1de55.mockapi.io/api/User",
                { ...newUser, createdAt: currentDate }
            );
            setNewUser({ UserName: '', PhoneNumber: '', Email: '', createdAt: currentDate });
        }
        catch (error) {
            console.error("Error creating user", error)
        }
    }

    return (
        <div>
            <Container style={{padding:'auto'}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div style={{ paddingTop: '2%', width: '50%', margin:'auto' }}>
                        <TextField
                            fullWidth
                            label="User Name"
                            name="UserName"
                            value={newUser.UserName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={{ paddingTop: '2%', width: '50%', margin:'auto' }}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="PhoneNumber"
                            value={newUser.PhoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={{ paddingTop: '2%', width: '50%', margin:'auto' }}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="Email"
                            type="email"
                            value={newUser.Email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={{ paddingTop: '1%' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Create
                        </Button>
                    </div>
                </div>
            </form>
            </Container>
        </div>

    )
}
