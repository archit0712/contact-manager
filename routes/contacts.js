const express = require('express');
const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contactsRef = req.db.collection('contacts');
        const snapshot = await contactsRef.get();
        const contacts = [];
        snapshot.forEach(doc => {
            contacts.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(contacts);
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
        const contactRef = req.db.collection('contacts')
        console.log(contactRef)
        const existingContact = await contactRef.where('email', '==', email).get();
        if (!existingContact.empty) {
            return res.status(400).json({ message: 'Contact already exists' });
        }
        const data = {
            name,
            email
        }
        const contact = await contactRef.add(data);
        res.status(201).json({ id: contact.id, ...data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
})



module.exports = router;