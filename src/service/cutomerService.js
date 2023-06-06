import axios from 'axios'
import * as constants from '../config/config'


export const getAllCustomers = async (data) => {
    console.log("INside getAllCustomers Service---->", data);
    const token = localStorage.getItem('authorization')
    try {
        const response = await axios.get(`${constants.BASE_URL}/customer/`, {
            headers: { "Content-type": "application/json", "authorization": token },
            params: data
        })
        return response
    } catch (error) {
        console.error(error);
        throw error.response.data.error
    }
}