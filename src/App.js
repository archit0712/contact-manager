import logo from './logo.svg';
import react, {useState, useEffect, useMemo} from 'react';
import { getContacts, addContact } from './apis/contact';
import './App.css';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button, TextField, Typography, Paper } from "@mui/material";


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

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.email) {
      alert("Both name and email are required!");
      return;
    }

    try {
      console.log("data",newContact);
      const addedContact = await addContact(newContact);
      setContacts((prevContacts) => [...prevContacts, addedContact]);
      setNewContact({ name: "", email: "" }); // Reset form
    } catch (error) {
      console.log("error",error);
      alert("Failed to add contact: " + error.response.data.message);
    }
  };

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
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: contacts,
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
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "300px",
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Add New Contact
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              value={newContact.name}
              onChange={(e) =>
                setNewContact((prev) => ({ ...prev, name: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              value={newContact.email}
              onChange={(e) =>
                setNewContact((prev) => ({ ...prev, email: e.target.value }))
              }
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddContact}
            >
              Add Contact
            </Button>
          </Box>
        </Paper>

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
