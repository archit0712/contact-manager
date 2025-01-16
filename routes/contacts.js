const express = require('express');
const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
    try {
        console.log('Received Request to get all contact')
        const contactsRef = req.db.collection('contacts');
        const snapshot = await contactsRef.get();
        const contacts = [];
        snapshot.forEach(doc => {
            contacts.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(contacts);
        console.log('Received Request to get all contact completed')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
})

// Add a new contact
router.post('/add', async (req, res) => {
    const { name, email } = req.body;
    console.log(name, email)
    if (!name || !email) {
        return res.status(400).json({ message: 'Please provide name and email' });
    }
    try {
        console.log('Received Request to add contact with email:', email)
        const contactRef = req.db.collection('contacts')
        const existingContact = await contactRef.where('email', '==', email).get();
        if (!existingContact.empty) {
            return res.status(400).json({ message: 'Contact already exists' });
        }
        const data = {
            name,
            email
        }
        const contact = await contactRef.add(data); console.log('Received Request to add contact with email:', email, 'completed')
        res.status(201).json({ id: contact.id, ...data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log('Received Request to delete contact with id:', id)
        const contactRef = req.db.collection('contacts').doc(id);
        const contact = await contactRef.get();
        if (!contact.exists) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        await contactRef.delete();
        console.log('Received Request to delete contact with id:', id, 'completed')
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
})



module.exports = router;