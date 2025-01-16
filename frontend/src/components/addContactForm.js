

import { Box, Button, TextField, Typography, Paper } from "@mui/material";


export const AddContactForm = ({ setContacts, newContact, setNewContact, addContact}) => {
    function isValiEmail(val) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(val)) {
          return 'Invalid Email Address';
        }
      }

    const handleAddContact = async () => {
        if (!newContact.name) {
        alert("Please enter your name");
        return;
        }
        if (!newContact.email) {
            alert("Please enter your email");
            return;
            }
    
        try{
        if(isValiEmail(newContact.email)){
            alert(isValiEmail(newContact.email));
            return;
        }
        const addedContact = await addContact(newContact);
        setContacts((prevContacts) => [...prevContacts, addedContact]);
        setNewContact({ name: "", email: "" }); // Reset form
        } catch (error) {
        console.log("error",error);
        alert("Failed to add contact: " + error.response.data.message);
        }
    };
    
    return (
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
              required={true}
              value={newContact.name}
              onChange={(e) =>
                setNewContact((prev) => ({ ...prev, name: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              required={true}
              value={newContact.email}
              type='email'
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
    );
}