// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports

interface RowType {
  name: string
  email: string
  phone_number: string
}


const rows: RowType[] = [
  {
    name: 'Sally Quinn',
    email: 'eebsworth2m@sbwire.com',
    phone_number: 'Human Resources Assistant'
  },
  {
    name: 'Sally Quinn',
    email: 'eebsworth2m@sbwire.com',
    phone_number: 'Human Resources Assistant'
  },
  {
    name: 'Sally Quinn',
    email: 'eebsworth2m@sbwire.com',
    phone_number: 'Human Resources Assistant'
  },
  {
    name: 'Sally Quinn',
    email: 'eebsworth2m@sbwire.com',
    phone_number: 'Human Resources Assistant'
  },
]


const CustomersTable = () => {
  return (
    <Card>
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
            {rows.map((row: RowType) => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default CustomersTable
