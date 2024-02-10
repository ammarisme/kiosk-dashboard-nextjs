
// ** MUI Imports
import { Button, Card, TableContainer } from '@mui/material'
import Grid from '@mui/material/Grid'

// ** MUI Imports
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Table from '@mui/material/Table'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ArowRight from 'mdi-material-ui/ArrowRight'
import io from 'socket.io-client'; // Import the socket.io-client library

// ** Icons Imports

// ** Custom Components Imports

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CustomerDetailsModal from './customers/customer_details'
import LoginModal from './customers/login_modal'

// ** Demo Components Imports
interface RowType {
  id: number,
  name: string
  email: string
  phone_number: string
}

const Customers = () => {

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(true);


  useEffect(() => {
    fetchData();
    connectToSocket(); // Connect to the Socket.IO server
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://ec2-13-234-20-8.ap-south-1.compute.amazonaws.com:5001/customer');
      if (Array.isArray(response.data)) {
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        setData(sortedData as any);
      } else {
        console.error('API response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const connectToSocket = () => {
    const socket = io('http://ec2-13-234-20-8.ap-south-1.compute.amazonaws.com:4002'); // Replace with your Socket.IO server URL
    // Add your Socket.IO event listeners or emit events here
    // Example:
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('chat message', (msg, serverOffset) => {
      console.log(serverOffset);
      console.log('Received chat message:', msg);
      handleMoreButtonClick(msg);

    });

    // Don't forget to clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  };
  const handleMoreButtonClick = (rowId: string | number) => {
    setSelectedRowId(rowId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRowId(0);
    setIsModalOpen(false);
  };


  const handleReload = () => {
    fetchData();
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      if (username == "catlitter" && password == "catlitter@123") {
        setIsLoggedIn(true);
        setLoginModalOpen(false);
      }

    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            {/* Reload Button */}
            <Button onClick={handleReload} variant="contained" color="primary" style={{ margin: '10px' }}>
              Reload
            </Button>
            <TableContainer>
              <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row: RowType) => (
                    <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone_number}</TableCell>
                      <TableCell>
                        <TableCell>
                          <ArowRight onClick={() => handleMoreButtonClick(row.id)} />
                        </TableCell>                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>        </Grid>
      </Grid>

      {/* Render the CustomerDetailsModal component */}
      <CustomerDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} rowId={selectedRowId} />

      {loginModalOpen && (
        <LoginModal onLogin={handleLogin} />
      )}
    </ApexChartWrapper>
  )
}

export default Customers
