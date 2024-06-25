import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert,
    Rating,
} from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    image: Yup.string().url('Invalid URL').required('Required'),
    color: Yup.string().required('Required'),
    origin: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    rating: Yup.number().required('Required').min(0, 'Minimum 0').max(5, 'Maximum 5'),
    description: Yup.string().required('Required'),
});

export default function Context() {
    const [orchids, setOrchids] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const fetchOrchids = async () => {
        try {
            const response = await axios.get(
                "https://66761bf3a8d2b4d072f26f6a.mockapi.io/api/OrchidList"
            );
            console.log("orchids", response.data);
            setOrchids(response.data);
        } catch (error) {
            console.error("Error fetching orchids", error);
        }
    };

    useEffect(() => {
        fetchOrchids();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            image: '',
            color: '',
            origin: '',
            category: '',
            rating: 0,
            description: '',
            isSpecial: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (isEditing) {
                await handleEdit(values);
            } else {
                await handleAdd(values);
            }
            resetForm();
        },
    });

    const handleEditClick = (orchid) => {
        formik.setValues(orchid);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        formik.resetForm();
    };

    const handleAddClick = () => {
        formik.resetForm();
        setIsAdding(true);
    };

    const handleAdd = async (values) => {
        try {
            const response = await axios.post(
                "https://66761bf3a8d2b4d072f26f6a.mockapi.io/api/OrchidList", values
            );
            setOrchids([...orchids, response.data]);
            setIsAdding(false);
            setSnackbarMessage('Add Orchid successful');
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error adding orchid", error);
        }
    };

    const handleEdit = async (values) => {
        console.log(values)
        try {
            const response = await axios.put(
                `https://66761bf3a8d2b4d072f26f6a.mockapi.io/api/OrchidList/${values.id}`, values
            );
            const updatedOrchids = orchids.map((orchid) =>
                orchid.id === values.id ? response.data : orchid
            );
            setOrchids(updatedOrchids);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating orchid", error);
        }
    };

    const handleCancelAdd = () => {
        setIsAdding(false);
        formik.resetForm();
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `https://66761bf3a8d2b4d072f26f6a.mockapi.io/api/OrchidList/${deleteId}`
            );
            const updatedOrchids = orchids.filter(orchid => orchid.id !== deleteId);
            setOrchids(updatedOrchids);
            setIsDeleting(false);
            setSnackbarMessage('Delete Orchid successful');
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error deleting orchid", error);
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsDeleting(true);
    };

    const handleCancelDelete = () => {
        setIsDeleting(false);
        setDeleteId(null);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <div style={{ width: '100%' }}>
                <Typography style={{ paddingTop: '15px' }} variant="h4" gutterBottom>
                    Orchid List
                </Typography>
                <div style={{ paddingRight: '5%', float: 'right' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddClick}
                        sx={{
                            backgroundColor: '#ff69b4',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#ffb6c1',
                            },
                        }}
                    >
                        Add Orchid
                    </Button>
                </div>
            </div>
            {orchids.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Special</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Origin</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orchids.map((orchid) => (
                                <TableRow key={orchid.id}>
                                    <TableCell>{orchid.id}</TableCell>
                                    <TableCell>{orchid.name}</TableCell>
                                    <TableCell>{orchid.isSpecial ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <img src={orchid.image} alt={orchid.name} style={{ width: '100px', height: '100px' }} />
                                    </TableCell>
                                    <TableCell>{orchid.color}</TableCell>
                                    <TableCell>{orchid.origin}</TableCell>
                                    <TableCell>{orchid.description}</TableCell>
                                    <TableCell>{orchid.category}</TableCell>
                                    <TableCell>
                                        <Rating
                                            name="rating"
                                            value={orchid.rating}
                                            readOnly
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleEditClick(orchid)}
                                            sx={{
                                                width: 100,
                                                color: 'pink',
                                                borderColor: 'pink',
                                                '&:hover': {
                                                    borderColor: 'pink',
                                                    backgroundColor: 'rgba(255, 192, 203, 0.1)',
                                                },
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            sx={{ width: 100 }}
                                            onClick={() => handleDeleteClick(orchid.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1">No orchids found.</Typography>
            )}

            <Dialog open={isEditing} onClose={handleCancelEdit}>
                <DialogTitle style={{textAlign:'center'}}>Edit Orchid</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            required
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Image"
                            name="image"
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.image && Boolean(formik.errors.image)}
                            helperText={formik.touched.image && formik.errors.image}
                            required
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Color"
                            name="color"
                            value={formik.values.color}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.color && Boolean(formik.errors.color)}
                            helperText={formik.touched.color && formik.errors.color}
                            required
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Origin"
                            name="origin"
                            value={formik.values.origin}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.origin && Boolean(formik.errors.origin)}
                            helperText={formik.touched.origin && formik.errors.origin}
                            required
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                            required
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            required
                            margin="dense"
                        />
                        <Rating
                            name="rating"
                            value={formik.values.rating}
                            onChange={(event, newValue) => {
                                formik.setFieldValue('rating', newValue);
                            }}
                            onBlur={formik.handleBlur}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#ff69b4',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#ffb6c1',
                                },
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: '#ff69b4',
                                color: '#ff69b4',
                                '&:hover': {
                                    borderColor: '#ffb6c1',
                                    color: '#ffb6c1',
                                },
                            }}
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={isAdding} onClose={handleCancelAdd}>
                <DialogTitle style={{textAlign:'center'}}>Add Orchid</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            required
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Image"
                            name="image"
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.image && Boolean(formik.errors.image)}
                            helperText={formik.touched.image && formik.errors.image}
                            required
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Color"
                            name="color"
                            value={formik.values.color}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.color && Boolean(formik.errors.color)}
                            helperText={formik.touched.color && formik.errors.color}
                            required
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Origin"
                            name="origin"
                            value={formik.values.origin}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.origin && Boolean(formik.errors.origin)}
                            helperText={formik.touched.origin && formik.errors.origin}
                            required
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                            required
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            required
                            margin="dense"
                        />
                        <Rating
                            name="rating"
                            value={formik.values.rating}
                            onChange={(event, newValue) => {
                                formik.setFieldValue('rating', newValue);
                            }}
                            onBlur={formik.handleBlur}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#ff69b4',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#ffb6c1',
                                },
                            }}
                        >
                            Create
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: '#ff69b4',
                                color: '#ff69b4',
                                '&:hover': {
                                    borderColor: '#ffb6c1',
                                    color: '#ffb6c1',
                                },
                            }}
                            onClick={handleCancelAdd}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={isDeleting} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Do you want to delete this orchid?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#ff69b4',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#ffb6c1',
                            },
                        }}
                        onClick={handleDelete}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: '#ff69b4',
                            color: '#ff69b4',
                            '&:hover': {
                                borderColor: '#ffb6c1',
                                color: '#ffb6c1',
                            },
                        }}
                        onClick={handleCancelDelete}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
