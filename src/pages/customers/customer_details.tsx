import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Box, Typography, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import FileCopyIcon from 'mdi-material-ui/ContentCopy'

interface CustomerDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    rowId: string | number;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({ isOpen, onClose, rowId }) => {
    const [customerDetails, setCustomerDetails] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://catlitter.lk/wp-json/wc/v3/customers/${rowId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic Y2tfYTA0OWYyNDNiOTUwMWI1NGFmNzc5M2I3ZTA3ZWZiOGExNGE5ZDQ4NDpjc18xNWUzYzA5ZDg1MmJiNDJhN2ZhYWVlYWZjYThlMmZiM2YzNGUxODY0"
                    }
                }
                );
                console.log(response.data)
                setCustomerDetails(response.data);
            } catch (error) {
                console.error('Error fetching customer details:', error);
            }
        };

        fetchData();
    }, [rowId]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                {customerDetails ? (
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>{customerDetails.first_name}</TableCell>
                                    <TableCell> <IconButton onClick={() => copyToClipboard(customerDetails.first_name)}>
                                        <FileCopyIcon />
                                    </IconButton></TableCell>
                                </TableRow>
                                <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>{customerDetails.last_name}</TableCell>
                                    <TableCell> <IconButton onClick={() => copyToClipboard(customerDetails.last_name)}>
                                        <FileCopyIcon />
                                    </IconButton></TableCell>
                                </TableRow>
                                <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                    <TableCell>Email</TableCell>
                                    <TableCell>{customerDetails.email}</TableCell>
                                    <TableCell> <IconButton onClick={() => copyToClipboard(customerDetails.email)}>
                                        <FileCopyIcon />
                                    </IconButton></TableCell>
                                </TableRow>
                                <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                    <TableCell>Phone number</TableCell>
                                    <TableCell>{customerDetails.username}</TableCell>
                                    <TableCell> <IconButton onClick={() => copyToClipboard(customerDetails.username)}>
                                        <FileCopyIcon />
                                    </IconButton></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) :
                    (
                        <Typography>No customer details available</Typography>
                    )}
            </Box>
        </Modal>
    );
};

export default CustomerDetailsModal;
