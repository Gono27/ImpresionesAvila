import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.user_id !== id));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Usuarios
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre de usuario</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.user_id}>
                                    <TableCell>{user.user_id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/edit-user/${user.user_id}`}
                                            style={{ marginRight: '10px' }}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDelete(user.user_id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default UserList;
