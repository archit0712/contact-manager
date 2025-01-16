
import  {useState, useEffect, useMemo} from 'react';
import { getContacts, addContact,deleteContact } from './apis/contact';
import './App.css';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button, TextField, Typography, Paper, MenuItem } from "@mui/material";
import { AddContactForm } from './components/addContactForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '' }); // State for new contact
  useEffect(()=>{
    const fetchContacts = async () =>{
      const contacts = await getContacts();
      setContacts(contacts);
    }
    fetchContacts();
  },[])

  const handleDeleteContact = async (contact) => {
     if(!contact){
      alert("No contact selected!");
      return;
     }
     try {
       await deleteContact(contact.id);
       setContacts((prevContacts) => prevContacts.filter((c) => c.id !== contact.id));
     } catch (error) {
       alert("Failed to delete contact: " + error.response.data.message);
     }
  }


  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> //optional custom cell render
      },
      {
        accessorFn: (row) => row.email, //alternate way
        id: "email", //id required if you use accessorFn instead of accessorKey
        header: "Email",
        Header: <i style={{ color: "red" }}>Email</i> //optional custom markup
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: contacts,
    enableRowActions: true,
    renderRowActionMenuItems: ({row}) => [
      <MenuItem  key="delete" onClick={() => handleDeleteContact(row.original)}> Delete </MenuItem>
    ],
    options: {
      search: true,
      pagination: true,
      pageSize: 5
    }
  });


  return (
    <div className="App" style={{ padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Manager
      </Typography>
      {/* Layout: Form on the Left, Table on the Right */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        {/* Add Contact Form */}
        <AddContactForm contacts={contacts} setContacts={setContacts} newContact={newContact} setNewContact={setNewContact} addContact={addContact} />
        {/* Table */}
        <Box
          sx={{
            flex: 1,
            maxWidth: "calc(100% - 320px)", // Leave space for the form
          }}
        >
          <MaterialReactTable table={table} />
        </Box>
      </Box>
    </div>
  );


}

export default App;
