import axios from 'axios';



export const getContacts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/`);
    return response.data;
}

export const addContact = async (contact) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/add`, contact);
    return response.data;
}